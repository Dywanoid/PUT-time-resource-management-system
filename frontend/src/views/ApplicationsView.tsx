import { useRef, useState, useContext } from 'react';
import {
  Layout, Form, Input, Button,
  List, Select, FormInstance, DatePicker, notification,
  Avatar
} from 'antd';
import {
  useChangeHolidayRequestStatusMutation,
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
  const [requestType, setRequestType] = useState('');
  const [startDate, setStartDate] = useState(Date);
  const [endDate, setEndDate] = useState(Date);
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState<string[]>([]);
  const [getUsersHolidayRequests, { data: usersApplicationData }] = useGetHolidayRequestsLazyQuery();
  const [getUserHolidayRequests, { data: userApplicationData }] = useGetHolidayRequestsLazyQuery();
  const [createApplication] = useCreateHolidayRequestMutation({
    onCompleted(){ openNotificationWithIcon('success', 'tworzenia wniosku'); },
    onError() { openNotificationWithIcon('error', 'tworzenia wniosku'); }
  });
  const [changeApplicationRequest] = useChangeHolidayRequestStatusMutation({
    onCompleted(){ openNotificationWithIcon('success', 'zmieniono status'); },
    onError() { openNotificationWithIcon('error', 'zmieniono status'); }
  });
  const sendApplicationRequest = (id, request, start, end) => {
    createApplication({
      refetchQueries: [namedOperations.Query.GetHolidayRequests],
      variables: { endDate: end, startDate: start, type: request, userId: id }
    });
  };
  const changeApplicationRequestStatus = (appId, reqId) => {
    changeApplicationRequest({
      refetchQueries: [namedOperations.Query.GetHolidayRequests],
      variables: { requestId: appId, status: reqId }
    });
  };

  if (userInfo !== null && userInfo !== undefined && userId.length === 0 && userRole.length === 0
    && userInfo.supervisor !== undefined && userInfo.subordinates){
    setUserId(userInfo.id || '');
    const userR = userInfo.roles as any;
    const subordinatesList: Array<string> = [];

    for (const user in userInfo.subordinates) {
      subordinatesList.push(userInfo.subordinates[user].id);
    }
    setUserRole(userInfo.roles as any);
    if (userR.includes('manager')) {
      getUsersHolidayRequests({ variables: { userList: subordinatesList } });
    }
    getUserHolidayRequests();
  }

  const userApplications = userApplicationData?.holidayRequests || [];
  const usersApplications = usersApplicationData?.holidayRequests || [];

  const requestTypes = [] as any;

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

  const onRequestTypeChange = (value: string) => {
    setRequestType(value);
  };

  const onFinish = () => {
    sendApplicationRequest(userId, requestType, startDate, endDate);
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

  const switchCase = (role, item) => {
    const concatStr = `${ role }_${ item.status }`;

    switch(concatStr) {
      case 'USER_PENDING':
        return (
          [<a key="1"
            onClick={() => handleEventChange(requestStatuses[3],item.id)}
          >
            { requestStatuses[3].substr(0, requestStatuses[3].length - 2) }
          </a>]
        );
      case 'MANAGER_CANCELLED':
      case 'USER_CANCELLED':
        return [<div key="2">Cancelled</div>];
      case 'MANAGER_REJECTED':
      case 'USER_REJECTED':
        return [<div key="2">Rejected</div>];
      case 'MANAGER_ACCEPTED':
      case 'USER_ACCEPTED':
        return [<div key="3">Accepted</div>];
      case 'MANAGER_PENDING':
        if (userInfo?.supervisor === null) {
          return (
            [<a key="3"
              onClick={() => handleEventChange(requestStatuses[2],item.id)}
            >
              { requestStatuses[2].substr(0, requestStatuses[2].length - 2) }
            </a>
            ,
            <a key="4"
              onClick={() => handleEventChange(requestStatuses[1],item.id)}
            >
              { requestStatuses[1].substr(0, requestStatuses[1].length - 2) }
            </a>]
          );
        } else {
          return (
            [<a key="1"
              onClick={() => handleEventChange(requestStatuses[3],item.id)}
            >
              { requestStatuses[3].substr(0, requestStatuses[3].length - 2) }
            </a>]
          );
        }

      default:
        return [];
    }
  };

  return (
    <Layout>
      <Content>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 10 }}
          ref={ formRef } onFinish={ onFinish }>
          { (userInfo?.supervisor.name.length !== 0)
          && (<Form.Item
            className="changeSupervisor"
            label="Przełożony"
          >
            { userInfo?.supervisor.name }
          </Form.Item>)
          }
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
        header={ <h1>Twoje wnioski</h1> }
        bordered
        itemLayout="horizontal"
        dataSource={ [...userApplications] }
        pagination={{ pageSize: 10 }}
        renderItem={ (item: any) => (
          <List.Item
            actions={ switchCase(userRole[0]!== undefined && userRole[0].length > 0
              ? userRole[0].toUpperCase()
              : 'USER', item)
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
        )}
      />
      { userRole.includes('manager')
      && (
        <List
          header={ <h1>Wnioski podwładnych</h1> }
          bordered
          itemLayout="horizontal"
          dataSource={ [...usersApplications] }
          pagination={ { pageSize: 10 } }
          renderItem={ (item: any) => (
            <List.Item
              actions={ switchCase(userRole[0]!== undefined && userRole[0].length > 0
                ? userRole[0].toUpperCase()
                : 'USER', item)
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
                  { ' ' + moment(item.endDate).format('DD-MM-YYYY') }
                </div> }
                avatar={ <Avatar style={
                  { backgroundColor: colorHash(item.type), verticalAlign: 'middle' } }
                size={ 64 } gap={ 1 } shape="square">
                  { item.type }
                </Avatar> }
              />
            </List.Item>
          ) }
        />) }
    </Layout>
  );
};