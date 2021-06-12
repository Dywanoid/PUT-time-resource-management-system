import { Calendar, Select, Layout, Avatar } from 'antd';
import {
  useGetAllUsersQuery,
  useGetUserInfoQuery,
  useGetTeamInfoQuery,
  useGetUsersApplicationsQuery
} from '../generated/graphql';
import '../css/CalendarView.css';
import moment from 'moment';

const { Content } = Layout;

const getListData = (value, userApplications, users) => {
  const listData: Array<{ content: string, type: string, id: string, name: string, userId: string }> = [];
  const getUserName = (id) => {
    for (const user in users) {
      if(users[user].id === id) {
        return users[user].name;
      }
    }

    return '';
  };

  for (let i = 0; i < userApplications.length; i++) {
    if (value === moment(userApplications[i].startDate)
    || value >= moment(userApplications[i].startDate) && value <= moment(userApplications[i].endDate).add(1, 'days')) {
      listData.push({
        content: userApplications[i].type.name, id: userApplications[i].id,
        name: getUserName(userApplications[i].userId)
        , type: 'black', userId: userApplications[i].userId
      });
    }
  }

  return listData || [];
};

const colorHash = (str: string) => {
  let hash = 0;

  for(let i=0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 3) - hash);
  }
  const color = Math.abs(hash).toString(16).substring(0, 6);

  return '#' + '000000'.substring(0, 6 - color.length) + color;
};

export const CalendarView = (): JSX.Element => {
  const { data: applicationData, refetch:refetchApplicationData } = useGetUsersApplicationsQuery(
    {
      fetchPolicy: 'no-cache',
      variables: {
        end: moment().clone().endOf('month')
        , requestStatusIds: ['2'], start: moment().clone().startOf('month')
      }
    }
  );
  const { data: userInfo } = useGetUserInfoQuery();
  const userId = userInfo?.user?.id as any;
  const { data: usersData } = useGetAllUsersQuery();
  const { data: userTeamsData } = useGetTeamInfoQuery(
    {
      fetchPolicy: 'no-cache',
      skip: !userId, variables:{ id: userId }
    }
  );
  const userApplications = applicationData?.holidayRequests || [];
  const users = usersData?.users || [];
  const userTeamsInfo = userTeamsData?.team || [];

  console.log(userTeamsInfo);
  console.log(userApplications);

  const dateCellRender = (value) => {
    const listData = getListData(value, userApplications, users);

    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={ item.id }>
            <Avatar style={{ backgroundColor: colorHash(item.name), marginTop: '-3px', verticalAlign: 'middle' }}
              size={ 21 } gap={ 4 } shape="square">
              { item.name.match(/\b(\w)/g) }
            </Avatar>
            { ' ' + item.content }
          </li>
        ))}
      </ul>
    );
  };

  const changeDateCellRender = (value) => {
    refetchApplicationData({
      end:value.clone().endOf('month'),
      requestStatusIds: ['2'], start: value.clone().startOf('month')
    });

    const listData = getListData(value, applicationData?.holidayRequests, users);

    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={ item.id }>
            <Avatar style={{ backgroundColor: colorHash(item.name), marginTop: '-3px', verticalAlign: 'middle' }}
              size={ 21 } gap={ 4 } shape="square">
              { item.name.match(/\b(\w)/g) }
            </Avatar>
            { ' ' }
            { item.content }
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Layout>
      <Content>
        <Select
          showSearch
          style={{ float:'right', marginLeft:'1%', marginTop: '0.8%', width: 200 }}
          placeholder="Wybierz Kategorię"
          optionFilterProp="children"
        />
        <Calendar
          dateCellRender={ dateCellRender }
          onChange={ changeDateCellRender }
        />
      </Content>
    </Layout>
  );
};