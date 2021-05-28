import React, { useRef, useState } from 'react';
import {
  Layout, Form, Input, Button, Menu, Dropdown,
  List, Select, FormInstance, DatePicker, notification,
  Avatar
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {
  useChangeHolidayRequestStatusMutation,
  useGetHolidayRequestStatusesQuery,
  useGetUserApplicationsLazyQuery,
  useGetAllUsersQuery,
  namedOperations,
  useCreateHolidayRequestMutation,
  useGetUserInfoQuery,
  useGetUserApplicationsTypesQuery
} from '../generated/graphql';
import '../css/ApplicationView.css';

const { Content } = Layout;
const { RangePicker } = DatePicker;

const openNotificationWithIcon = (type, action) => {
  notification[type]({
    description: type === 'success'
      ? `Pomyślnie wykonano akcję ${ action }.`
      : `Akcja ${ action } nie została wykonana.`,
    message: 'Powiadomienie'
  });
};

export const ApplicationsView = (): JSX.Element => {
  const { data: userInfo } = useGetUserInfoQuery();
  const { data: usersData } = useGetAllUsersQuery();
  const { data: requestStatuses } = useGetHolidayRequestStatusesQuery();
  const [supervisorId, setSupervisorId] = useState('');
  const [requestType, setRequestType] = useState('');
  const [applicationId, setApplicationId] = useState('');
  const [startDate, setStartDate] = useState(Date);
  const [endDate, setEndDate] = useState(Date);
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState<string[]>([]);
  const [getUserApplications, { data: applicationData }] = useGetUserApplicationsLazyQuery();
  // const holidayUserId = userInfo?.me.id || '1';
  const { data: applicationsTypes } = useGetUserApplicationsTypesQuery();
  const [createApplication] = useCreateHolidayRequestMutation({
    onCompleted(){ openNotificationWithIcon('success', 'tworzenia wniosku'); },
    onError() { openNotificationWithIcon('error', 'tworzenia wniosku'); }
  });
  const [changeApplicationRequest] = useChangeHolidayRequestStatusMutation({
    onCompleted(){ openNotificationWithIcon('success', 'zmieniono status'); },
    onError() { openNotificationWithIcon('error', 'zmieniono status'); }
  });
  const sendApplicationRequest = (supervisor, request, start, end) => {
    createApplication({
      refetchQueries: [namedOperations.Query.GetUserApplications],
      variables: { endDate: end, startDate: start, typeId: request, userId: supervisor }
    });
  };
  const changeApplicationRequestStatus = (appId, reqId) => {
    changeApplicationRequest({
      refetchQueries: [namedOperations.Query.GetUserApplications],
      variables: { requestId: appId, statusId: reqId }
    });
  };

  if (userInfo !== null && userInfo !== undefined && userId.length === 0 && userRole.length === 0) {
    setUserId(userInfo.me.id);
    setUserRole(userInfo.me.roles as any);
    getUserApplications({ variables: { holidayUserId: userInfo.me.id } });
  }
  console.log(userRole);

  // console.log(applicationData?.userHolidayRequests);

  const users = usersData?.users || [];
  const types = applicationsTypes?.HolidayRequestTypes || [];
  const applicationsData = applicationData?.userHolidayRequests || [];
  const requestStatusesData = requestStatuses?.HolidayRequestStatuses || [];

  console.log(userId);

  const superVisors = [] as any;
  const requestTypes = [] as any;
  const requestStatus = [] as any;

  for (let i = 0; i < users.length; i++) {
    if (users[i].roles!.includes('manager')) {
      superVisors.push(
        <Select.Option
          key={ users[i].id }
          value={ users[i].id }
        >
          { users[i].name }
        </Select.Option>
      );
    }
  }

  for (let i = 0; i < types.length; i++) {
    requestTypes.push(
      <Select.Option
        key={ types[i].id }
        value={ types[i].id }
      >
        { types[i].name }
      </Select.Option>
    );
  }

  for (let i = 0; i < requestStatusesData.length; i++) {
    requestStatus.push(
      <Menu.Item
        key={ requestStatusesData[i].id }
        onClick	={ () => changeStatus(requestStatusesData[i].id) }
      >
        { requestStatusesData[i].name }
      </Menu.Item>
    );
  }

  const formRef = useRef<FormInstance>(null);

  const onSupervisorChange = (value: string) => {
    setSupervisorId(value);
    console.log(value, 'onSupervisorChange');
  };

  const onRequestTypeChange = (value: string) => {
    setRequestType(value);
    console.log(value, 'onRequestTypeChange');
  };

  const onFinish = () => {
    // values are passed here
    console.log(supervisorId, requestType, startDate, endDate);

    sendApplicationRequest(supervisorId, requestType, startDate, endDate);
    setSupervisorId('');
    setRequestType('');
    setStartDate('');
    setEndDate('');
    console.log('done!');
    formRef.current?.resetFields();
  };

  const onReset = () => {
    formRef.current?.resetFields();
  };

  const onRangePickerChange = (dates, dateStrings) => {
    console.log(dates[0].format('DD-MM-YYYY'));
    setStartDate(dates[0]._d);
    setEndDate(dates[1]._d);
  };

  const onFill = () => {
    formRef.current?.setFieldsValue({
      gender: 'male',
      note: 'Hello world!'
    });
  };

  const changeStatus = (requestId) => {
    changeApplicationRequestStatus(applicationId, requestId);
  };

  const menu = () => (
    <Menu>
      { requestStatus }
    </Menu>
  );

  return (
    <Layout>
      <Content>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}
          ref={ formRef } name="control-ref" onFinish={ onFinish }>
          <Form.Item name="Wybierz przełożonego" label="Wybierz przełożonego" rules={[{ required: true }]}>
            <Select
              onSelect={ onSupervisorChange }
            >
              { superVisors }
            </Select>
          </Form.Item>
          <Form.Item name="Typ wniosku" label="Typ wniosku" rules={[{ required: true }]}>
            <Select
              onChange={ onRequestTypeChange }
              allowClear
            >
              { requestTypes }
            </Select>
          </Form.Item>
          <Form.Item name="Dates" label="Dates" rules={[{ required: true }]}>
            <RangePicker onChange={ onRangePickerChange }/>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
          >
            {({ getFieldValue }) =>
              getFieldValue('gender') === 'other'
                ? (
                  <Form.Item
                    name="customizeGender"
                    label="Customize Gender"
                    rules={[{ required: true }]}
                  >
                    <Input/>
                  </Form.Item>
                )
                : null
            }
          </Form.Item>
          <Form.Item  wrapperCol={{ offset: 8, span: 16 }}>
            <Button htmlType="button" onClick={onReset}>
              Wyczyść
            </Button>
            <Button type="primary" htmlType="submit">
              Wyślij
            </Button>
          </Form.Item>
        </Form>
      </Content>
      <List
        header={ <h1>Wnioski</h1> }
        bordered
        className="teamsList"
        itemLayout="vertical"
        dataSource={ [...applicationsData] }
        renderItem={ (item: any) => {
          return (
            <List.Item
              actions={
                (userRole.includes('manager'))
                  ? ([
                    <Dropdown
                      key="1"
                      overlay={ menu }
                      className="actionButton"
                      trigger={ ['click'] }
                    >
                      <Button onClick={ () => setApplicationId(item.id) }>Akcja</Button>
                    </Dropdown>
                  ])
                  : undefined
              }
            >
              <List.Item.Meta
                title={ <div>{ item.type.name }</div> }
                description={ <div>{ item.status.name }</div> }
                avatar={ <Avatar size={ 64 } icon={ <UserOutlined/> }/> }
              />
            </List.Item>
          );

          return (null);
        }}
      />
    </Layout>
  );
};