import React, { useRef, useState, useContext } from 'react';
import {
  Layout, Form, Input, Button,
  List, Select, FormInstance, DatePicker, notification,
  Avatar
} from 'antd';
import {
  useChangeHolidayRequestStatusMutation,
  useGetAllUsersQuery,
  namedOperations,
  useCreateHolidayRequestMutation,
  HolidayRequestStatus,
  HolidayRequestType,
  useGetHolidayRequestsLazyQuery
} from '../generated/graphql';
import moment from 'moment';
import { UserContext } from '../utils/auth';
import { colorHash } from '../utils/colorHash';
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

const requestStatuses = Object.values(HolidayRequestStatus);
const applicationsTypes = Object.values(HolidayRequestType);

export const ApplicationsView = (): JSX.Element => {
  const userInfo = useContext(UserContext);
  const { data: usersData } = useGetAllUsersQuery();
  const [supervisorId, setSupervisorId] = useState('');
  const [requestType, setRequestType] = useState('');
  const [startDate, setStartDate] = useState(Date);
  const [endDate, setEndDate] = useState(Date);
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState<string[]>([]);
  const [getHolidayRequests, { data: applicationData }] = useGetHolidayRequestsLazyQuery();
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
      refetchQueries: [namedOperations.Query.GetHolidayRequests],
      variables: { endDate: end, startDate: start, type: request, userId: supervisor }
    });
  };
  const changeApplicationRequestStatus = (appId, reqId) => {
    changeApplicationRequest({
      refetchQueries: [namedOperations.Query.GetHolidayRequests],
      variables: { requestId: appId, status: reqId }
    });
  };

  if (userInfo !== null && userInfo !== undefined && userId.length === 0 && userRole.length === 0) {
    setUserId(userInfo.id || '');
    setUserRole(userInfo.roles as any);
    getHolidayRequests(
      {
        variables:
        { requestStatuses, requestTypes: applicationsTypes }
      }
    );
  }

  const users = usersData?.users || [];
  const applicationsData = applicationData?.holidayRequests || [];

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

  for (let i = 0; i < applicationsTypes.length; i++) {
    requestTypes.push(
      <Select.Option
        key={ applicationsTypes[i] }
        value={ applicationsTypes[i] }
      >
        { applicationsTypes[i] }
      </Select.Option>
    );
  }

  const formRef = useRef<FormInstance>(null);

  const onSupervisorChange = (value: string) => {
    setSupervisorId(value);
  };

  const onRequestTypeChange = (value: string) => {
    setRequestType(value);
  };

  const onFinish = () => {
    sendApplicationRequest(supervisorId, requestType, startDate, endDate);
    setSupervisorId('');
    setRequestType('');
    setStartDate('');
    setEndDate('');
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
                (userRole.includes('manager') && item.status === 'ACCEPTED')
                  ? ([
                    <a key="1"
                      onClick={() => handleEventChange(requestStatuses[2],item.id)}
                    >
                      { requestStatuses[2].substr(0, requestStatuses[2].length - 2) }
                    </a>
                  ])
                  : ((userRole.includes('manager') && item.status === 'CANCELLED')
                    ? ([
                      <div key="2">Cancelled</div>
                    ])
                    : ([
                      <a key="3"
                        onClick={() => handleEventChange(requestStatuses[3],item.id)}
                      >
                        { requestStatuses[3].substr(0, requestStatuses[3].length - 3) }
                      </a>,
                      <a key="4"
                        onClick={() => handleEventChange(requestStatuses[1],item.id)}
                      >
                        { requestStatuses[1].substr(0, requestStatuses[1].length - 2) }
                      </a>
                    ]))
              }
            >
              <List.Item.Meta
                title={ <div>
                  { item.type.replace('_', ' ') + ' - ' }
                  { item.user.name }
                </div> }
                description={ <div>
                  od
                  { '  ' + moment(item.startDate).format('DD-MM') + ' ' }
                  do
                  {' ' + moment(item.endDate).format('DD-MM-YYYY')}
                </div> }
                avatar={ <Avatar style={
                  { backgroundColor: colorHash(item.type), verticalAlign: 'middle' } }
                size={ 64 } gap={ 1 } shape="square">
                  { item.type }
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