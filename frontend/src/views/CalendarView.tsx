import React, { useState, useEffect } from 'react';
import { Calendar, Select, Layout, Avatar } from 'antd';
import { useGetAllUsersQuery, useGetUsersApplicationsLazyQuery } from '../generated/graphql';
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

const colors = [
  'red',
  'green',
  'brown',
  'black',
  'blue',
  'purple',
  'volcano',
  'gold',
  'lime'
];

export const CalendarView = (): JSX.Element => {
  const [getUsersApplications, { data: applicationData }] = useGetUsersApplicationsLazyQuery();
  // const [userId, setUserId] = useState('');
  const { data: usersData } = useGetAllUsersQuery();
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [calendarEvents, setCalendarEvents] = useState();

  let userApplications = applicationData?.holidayRequests || [];
  const users = usersData?.users || [];

  // let i = 0;
  // getUsersApplications({ variables: { end: '09.05.2021', requestStatusIds: ['1'], start: '01.05.2021'  } });
  // if (i === 0) {
  //   console.log('lol');
  //   i =
  //   getUsersApplications({ variables: { end: '09.07.2021', requestStatusIds: ['1'], start: '01.05.2021'  } });
  // }
  // console.log(applicationData?.holidayRequests);

  // if (userId === '') {
  //   setUserId('s');
  //   getUsersApplications({ variables: { end: '09.05.2021', requestStatusIds: ['1'], start: '01.05.2021'  } });
  // }

  console.log(userApplications);
  // console.log(startDate);
  // console.log(moment());

  useEffect(() => {
    setStartDate(moment().clone().startOf('month') as any);
    setEndDate(moment().clone().endOf('month') as any);
    async function fetchMyAPI() {
      const response = await getUsersApplications(
        {
          variables:
          {
            end: moment().clone().endOf('month')
            , requestStatusIds: ['2'], start: moment().clone().startOf('month')
          }
        }
      );

      userApplications = applicationData?.holidayRequests || [];
    }

    fetchMyAPI();
  }, []);

  // if (startDate === undefined) {
  //   setStartDate(moment().clone().startOf('month') as any);
  //   setEndDate(moment().clone().endOf('month') as any);
  //   getUsersApplications(
  //     {
  //       variables:
  //       {
  //         end: moment().clone().endOf('month')
  //         , requestStatusIds: ['2'], start: moment().clone().startOf('month')
  //       }
  //     }
  //   );
  // }

  const dateCellRender = (value) => {
    const listData = getListData(value, userApplications, users);

    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={ item.id }>
            {/* <Badge color={ colors[item.id] } text={ item.content }/> */}
            <Avatar style={{ backgroundColor: colors[item.userId], marginTop: '-3px', verticalAlign: 'middle' }}
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

  const changeDateCellRender = (value) => {
    console.log(value.clone().startOf('month'));
    setStartDate(value.clone().startOf('month') as any);
    setEndDate(value.clone().endOf('month') as any);
    async function fetchMyAPI() {
      await getUsersApplications(
        {
          variables:
          {
            end: value.clone().endOf('month')
            , requestStatusIds: ['2'], start: value.clone().startOf('month')
          }
        }
      );

    }

    fetchMyAPI();
    const listData = getListData(value, applicationData?.holidayRequests, users);

    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={ item.id }>
            {/* <Badge color={ colors[item.id] } text={ item.content }/> */}
            <Avatar style={{ backgroundColor: colors[item.userId], marginTop: '-3px', verticalAlign: 'middle' }}
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