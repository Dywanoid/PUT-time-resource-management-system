import { useContext } from 'react';
import { Calendar, Select, Layout, Avatar } from 'antd';
import {
  useGetTeamInfoQuery,
  useGetUsersApplicationsQuery
} from '../generated/graphql';
import { colorHash } from '../utils/colorHash';
import '../css/CalendarView.css';
import { UserContext } from '../utils/auth';

import moment from 'moment';

const { Content } = Layout;

const getListData = (value, userApplications) => {
  const listData: Array<{ content: string, type: string, id: string, name: string, userId: string }> = [];

  for (let i = 0; i < userApplications.length; i++) {
    if (value === moment(userApplications[i].startDate)
    || value >= moment(userApplications[i].startDate) && value <= moment(userApplications[i].endDate).add(1, 'days')) {
      listData.push({
        content: userApplications[i].type.name, id: userApplications[i].id,
        name: userApplications[i].user.name
        , type: 'black', userId: userApplications[i].userId
      });
    }
  }

  return listData || [];
};

export const CalendarView = (): JSX.Element => {
  const userInfo = useContext(UserContext);
  const userId = userInfo?.id as any;
  const userRole = userInfo?.roles || ['user'] as any;
  const { data: applicationData, refetch:refetchApplicationData } = useGetUsersApplicationsQuery(
    {
      fetchPolicy: 'no-cache',
      variables: {
        end: moment().clone().endOf('month')
        , onlyUserTeams: !userRole.includes('manager')
        , requestStatusIds: ['2'], start: moment().clone().startOf('month')
      }
    }
  );
  const { data: userTeamsData } = useGetTeamInfoQuery(
    {
      fetchPolicy: 'no-cache',
      skip: !userId, variables:{ id: userId }
    }
  );
  const userApplications = applicationData?.holidayRequests || [];
  const userTeamsInfo = userTeamsData?.team || [];

  const dateCellRender = (value) => {
    const listData = getListData(value, userApplications);

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
      end:value.clone().endOf('month')
      , onlyUserTeams: !userRole.includes('manager'),
      requestStatusIds: ['2'], start: value.clone().startOf('month')
    });

    const listData = getListData(value, applicationData?.holidayRequests);

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