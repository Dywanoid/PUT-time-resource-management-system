import React, { useRef, useState } from 'react';
import {
  Layout, Form, Input, Button,
  List, Select, FormInstance, DatePicker, notification,
  Avatar
} from 'antd';
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
import moment from 'moment';
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

const colorHash = (str: string) => {
  let hash = 0;

  for(let i=0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 3) - hash);
  }
  const color = Math.abs(hash).toString(16).substring(0, 6);

  return '#' + '000000'.substring(0, 6 - color.length) + color;
};

export const ApplicationsView = (): JSX.Element => {
  const { data: userInfo } = useGetUserInfoQuery();
  const { data: usersData } = useGetAllUsersQuery();
  const { data: requestStatuses } = useGetHolidayRequestStatusesQuery();
  const [supervisorId, setSupervisorId] = useState('');
  const [requestType, setRequestType] = useState('');
  const [startDate, setStartDate] = useState(Date);
  const [endDate, setEndDate] = useState(Date);
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState<string[]>([]);
  const [getUserApplications, { data: applicationData }] = useGetUserApplicationsLazyQuery();
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
    setUserId(userInfo.user.id);
    setUserRole(userInfo.user.roles as any);
    getUserApplications({ variables: { holidayUserId: userInfo.user.id } });
  }

  const users = usersData?.users || [];
  const types = applicationsTypes?.holidayRequestTypes || [];
  const applicationsData = applicationData?.userHolidayRequests || [];
  const requestStatusesData = requestStatuses?.holidayRequestStatuses || [];

  // console.log(userId);

  const superVisors = [] as any;
  const requestTypes = [] as any;

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

  const onRangePickerChange = (dates) => {
    setStartDate(dates[0]._d);
    setEndDate(dates[1]._d);
  };

  const handleEventChange = (buttonType, itemId) => {
    changeApplicationRequestStatus(itemId, buttonType);
  };

  const getUserName = (id) => {
    for (const user in users) {
      if(users[user].id === id) {
        return users[user].name;
      }
    }

    return '';
  };

  return (
    <Layout>
      <Content>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 10 }}
          ref={ formRef } name="control-ref" onFinish={ onFinish }>
          <Form.Item
            className="changeSupervisor"
            name="Wybierz przełożonego"
            label="Wybierz przełożonego"
            rules={[{ required: true }]}
          >
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
          <Form.Item name="Data" label="Data" rules={[{ required: true }]}>
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
            <Button htmlType="button" onClick={ onReset }>
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
        itemLayout="horizontal"
        dataSource={ [...applicationsData] }
        pagination={{ pageSize: 10 }}
        renderItem={ (item: any) => {
          return (
            <List.Item
              actions={
                (userRole.includes('manager') && item.status.name === 'Accepted')
                  ? ([
                    <a key="1"
                      onClick={() => handleEventChange(requestStatusesData[2].id,item.id)}
                    >
                      { requestStatusesData[2].name.substr(0, requestStatusesData[2].name.length - 2) }
                    </a>
                  ])
                  : ((userRole.includes('manager') && item.status.name === 'Cancelled')
                    ? ([
                      <div key="2">Cancelled</div>
                    ])
                    : ([
                      <a key="3"
                        onClick={() => handleEventChange(requestStatusesData[3].id,item.id)}
                      >
                        { requestStatusesData[3].name.substr(0, requestStatusesData[3].name.length - 3) }
                      </a>,
                      <a key="4"
                        onClick={() => handleEventChange(requestStatusesData[1].id,item.id)}
                      >
                        { requestStatusesData[1].name.substr(0, requestStatusesData[1].name.length - 2) }
                      </a>
                    ]))
              }
            >
              <List.Item.Meta
                title={ <div>
                  { item.type.name + ' - ' }
                  { getUserName(item.userId) }
                </div> }
                description={ <div>
                  od
                  { '  ' + moment(item.startDate).format('DD-MM') + ' ' }
                  do
                  {' ' + moment(item.endDate).format('DD-MM-YYYY')}
                </div> }
                avatar={ <Avatar style={{ backgroundColor: colorHash(item.type.name), verticalAlign: 'middle' }}
                  size={ 64 } gap={ 1 } shape="square">
                  { item.type.shortCode }
                </Avatar> }
              />
            </List.Item>
          );

          return (null);
        }}
      />
    </Layout>
  );
};