import { useEffect, useState, useContext } from 'react';
import { injectIntl } from 'react-intl';
import { UserContext } from '../utils/auth';
import { Calendar, Select, Layout, Avatar } from 'antd';
import moment from 'moment';
import {
  useGetAllTeamsQuery,
  useGetHolidayRequestsQuery,
  useGetUsersDayOffQuery,
  useGetAllUsersQuery
} from '../generated/graphql';
import { colorHash } from '../utils/colorHash';
import '../css/CalendarView.css';

const { Option, OptGroup } = Select;
const { Content } = Layout;

const getListData = (value, userApplications, currentFilter) => {
  const key = currentFilter.match(/^[^-]*[^ -]/g) === null ? '' : currentFilter.match(/^[^-]*[^ -]/g)
        , val = currentFilter.match(/\w[^-]*$/g) === null ? '' : currentFilter.match(/\w[^-]*$/g);
  const listData: Array<{ content: string, type: string, id: string, name: string, userId: string }> = [];

  for (let i = 0; i < userApplications.length; i++) {
    if (value === moment(userApplications[i].startDate)
    || value >= moment(userApplications[i].startDate) && value <= moment(userApplications[i].endDate).add(1, 'days')) {
      if (key[0] === 'user' && val[0] === userApplications[i].user.id) {
        listData.push({
          content: userApplications[i].type, id: userApplications[i].id,
          name: userApplications[i].user.name
          , type: 'black', userId: userApplications[i].user.id
        });
      }
      if (key[0] === 'team') {
        for (let j = 0; j < userApplications[i].user.teams.length; j++) {
          if (val[0] === userApplications[i].user.teams[j].id) {
            listData.push({
              content: userApplications[i].type, id: userApplications[i].id,
              name: userApplications[i].user.name
              , type: 'black', userId: userApplications[i].user.id
            });
          }
        }
      }
      if (key === '' && val === '') {
        listData.push({
          content: userApplications[i].type, id: userApplications[i].id,
          name: userApplications[i].user.name
          , type: 'black', userId: userApplications[i].user.id
        });
      }
    }
  }

  return listData || [];
};

export const CalendarView = injectIntl(({ intl }): JSX.Element => {
  const userInfo = useContext(UserContext);
  const user = userInfo as any;
  const { data: userData , loading, error } = useGetAllUsersQuery();
  const [usersList, setUsersList] = useState<string[]>([]);
  const [currentFilter, setFilter] = useState(' ');
  const [teamsListHtml, setTeamsListHtml] = useState() as any;
  const [usersListHtml, setUsersListHtml] = useState() as any;
  const users = userData?.users || [] as any;
  const { data: applicationData, refetch:refetchApplicationData } = useGetHolidayRequestsQuery(
    {
      fetchPolicy: 'no-cache',
      variables: {
        end: moment().clone().endOf('month')
        , requestStatuses: ['ACCEPTED']
        , start: moment().clone().startOf('month')
        , userList: usersList
      } as any
    }
  );
  const { data: dayOffsData, refetch:refetchDayOffsData } = useGetUsersDayOffQuery(
    {
      fetchPolicy: 'no-cache',
      variables: {
        end: moment().clone().endOf('month')
        , start: moment().clone().startOf('month')
      } as any
    }
  );
  const { data: userTeamsData, loading: teamsLoading, error: teamsError }
  = useGetAllTeamsQuery({ fetchPolicy: 'no-cache' });
  let userApplications = [] as any;

  if (user?.roles.includes('manager')) {
    userApplications = applicationData?.holidayRequests || [];
  } else {
    userApplications = dayOffsData?.daysOff || [];
  }

  const userTeamsInfo = userTeamsData?.teams || [];

  useEffect(
    () => {
      const teamsHtml = [] as any;
      const usersHtml = [] as any;
      const data: string[] = [];

      if(!loading && !error) {
        if (user?.roles.includes('manager')) {
          for (let i = 0; i < users.length; i++) {
            data.push( users[i].id );
            usersHtml.push(
              <Option
                value={ `user-${ users[i].id }` }
                key={ `user-${ users[i].id }` }
              >
                { users[i].name }
              </Option>
            );
          }
        }
        usersHtml.push(
          <Option
            value={ '' }
            key={ 'wszyscy' }
          >
            { intl.formatMessage({ id: 'all_users' }) }
          </Option>
        );
        for (let i = 0; i < userTeamsInfo.length; i++) {
          teamsHtml.push(
            <Option
              value={ `team-${ userTeamsInfo[i].id }` }
              key={ `team-${ userTeamsInfo[i].id }` }
            >
              { userTeamsInfo[i].name }
            </Option>
          );
        }
        setUsersList(data);
      } else {
        for (let i = 0; i < userApplications.length; i++) {
          if (!data.includes(userApplications[i].user.id)) {
            data.push( userApplications[i].user.id );
            usersHtml.push(
              <Option
                value={ `user-${ userApplications[i].user.id }` }
                key={ `user-${ userApplications[i].user.id }` }
              >
                { userApplications[i].user.name }
              </Option>
            );
          }
        }
        for (let i = 0; i < user.teams.length; i++) {
          teamsHtml.push(
            <Option
              value={ `team-${ user.teams[i].id }` }
              key={ `team-${ user.teams[i].id }` }
            >
              { user.teams[i].name }
            </Option>
          );
        }
        usersHtml.push(
          <Option
            value={ '' }
            key={ 'wszyscy' }
          >
            { intl.formatMessage({ id: 'all_users' }) }
          </Option>
        );
        setUsersList(data);
      }

      setTeamsListHtml(teamsHtml);
      setUsersListHtml(usersHtml);
    },
    [
      teamsLoading,
      teamsError,
      loading,
      error]
  );

  const dateCellRender = (value) => {
    const listData = getListData(value, userApplications, currentFilter);

    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={ item.id }>
            <Avatar style={ { backgroundColor: colorHash(item.name), marginTop: '-3px', verticalAlign: 'middle' } }
              size={ 21 } gap={ 4 } shape="square">
              { item.name.match(/\b(\w)/g) }
            </Avatar>
            { ' ' }
            { user.roles.includes('manager')
              ? intl.formatMessage({ id: item.content.toLowerCase() })
              : item.name
            }
          </li>
        ))}
      </ul>
    );
  };

  const changeDateCellRender = (value) => {
    if (user?.roles.includes('manager')) {
      refetchApplicationData({
        end:value.clone().endOf('month')
        , requestStatuses: ['ACCEPTED']
        , start: value.clone().startOf('month')
        , userList: usersList
      } as any);
    } else {
      refetchDayOffsData({
        end:value.clone().endOf('month')
        , start: value.clone().startOf('month')
      } as any);
    }

    const listData = getListData(value, userApplications, currentFilter);

    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={ item.id }>
            <Avatar style={{ backgroundColor: colorHash(item.name), marginTop: '-3px', verticalAlign: 'middle' }}
              size={ 21 } gap={ 4 } shape="square">
              { item.name.match(/\b(\w)/g) }
            </Avatar>
            { ' ' }
            { user.roles.includes('manager')
              ? intl.formatMessage({ id: item.content.toLowerCase() })
              : item.name
            }
          </li>
        ))}
      </ul>
    );
  };

  const selectedFilter = (value) => setFilter(value);

  return (
    <Layout>
      <Content>
        <Select
          showSearch
          style={{ float:'right', padding: 12, width: 240 }}
          placeholder={ intl.formatMessage({ id: 'choose_filter' }) }
          optionFilterProp="children"
          onSelect={ selectedFilter }
        >
          <OptGroup label={ intl.formatMessage({ id: 'teams' }) }>
            { teamsListHtml }
          </OptGroup>
          <OptGroup label={ intl.formatMessage({ id: 'users' }) }>
            { usersListHtml }
          </OptGroup>
        </Select>
        <Calendar
          dateCellRender={ dateCellRender }
          onChange={ changeDateCellRender }
        />
      </Content>
    </Layout>
  );
});