import React, { useEffect, useMemo, useState } from 'react';
import moment, { Moment } from 'moment';
import { Button, Table, DatePicker, Space } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/pl_PL';
import { formatDateForBackend } from '../utils/utils';
import { injectIntl } from 'react-intl';
import { useGetAllUsersQuery, useGetUserProjectsQuery } from '../generated/graphql';
import { APP_HOSTNAME } from '../graphql/apolloClient';
import '../css/UsersReportsView.css';

const customDateFormat = (value: Moment) => value.format('MM/YYYY');
const getMonthEnds = (date: Moment) => {

  return {
    end: formatDateForBackend(date.clone().endOf('month')),
    start: formatDateForBackend(date.clone().startOf('month'))
  };
};
const currentMomentGetter = () => moment();

interface TableRow {
    name: string;
    hours: string;
    key: string;
  }

interface TableColumn {
    dataIndex: string;
    title: string;
  }

export const UsersReportsView: React.FC = injectIntl(({ intl }) => {
  const [date, setDate] = useState<Moment>(currentMomentGetter);
  const [userData, setUserData] = useState<TableRow[]>([]);
  const monthRange = useMemo(() => getMonthEnds(date), [date]);

  const reportsQuery = useGetUserProjectsQuery(
    {
      fetchPolicy: 'no-cache',
      variables: {
        fromDate: monthRange.start,
        toDate: monthRange.end
      }
    }
  );

  const usersQuery = useGetAllUsersQuery();

  useEffect(
    () => {
      if(reportsQuery?.data?.projectAssignments && usersQuery?.data?.users) {
        const data: TableRow[] = [];

        const nameMap: {[id: string]: string} = {};
        const timeMap: {[id: string]: number} = {};

        usersQuery?.data?.users.forEach((user) => {
          nameMap[user.id] = user.name;
          timeMap[user.id] = 0;
        });

        reportsQuery?.data?.projectAssignments.forEach((projectAssignment) => {
          const { user: { id }, timeLogs } = projectAssignment;

          timeLogs?.forEach((timeLog) => {
            if(moment(timeLog.date).isBetween(monthRange.start, monthRange.end, 'day', '[]')) {
              timeMap[id] += timeLog.duration;
            }

          });
        });

        Object.entries(nameMap).forEach(([id, name]) => {
          const row: TableRow = {
            hours: `${ timeMap[id] /60 } h`,
            key: id,
            name
          };

          data.push(row);
        });

        setUserData(data);
      }
    },
    [
      reportsQuery,
      usersQuery
    ]
  );

  const onChangeForDataPicker = (newDate): void => {
    if(newDate) {
      setDate(newDate);
    }
  };

  const changeMonth = (forwardDirection: boolean): void => {
    const months = forwardDirection ? 1 : -1;

    const newDate = date.clone().add(months, 'month');

    onChangeForDataPicker(newDate);
  };

  const dataColumns: TableColumn[] = useMemo(
    () => [
      { dataIndex: 'name', title: intl.formatMessage({ id: 'user_name' }) },
      { dataIndex: 'hours', title: intl.formatMessage({ id: 'hours' }) }
    ],
    [intl.locale]
  );

  return (
    <>
      <Space
        className="vertical-spacer"
        direction="vertical"
        size="large"
      >
        <div
          className="floatRight"
        >
          <Button
            icon={<CaretLeftOutlined/>}
            onClick={() => changeMonth(false)}
            shape="round"
            size='small'
            type="ghost"
          />
          <DatePicker
            className="reports-date-picker"
            format={customDateFormat}
            locale={locale}
            onChange={onChangeForDataPicker}
            picker="month"
            value={date}
          />
          <Button
            icon={<CaretRightOutlined/>}
            onClick={() => changeMonth(true)}
            shape="round"
            size='small'
            type="ghost"
          />
        </div>
        <Table
          bordered
          columns={dataColumns}
          dataSource={userData}
          pagination={false}
        />
        <div
          className="floatRight"
        >
          <Button
            type="primary"
            href={`${ APP_HOSTNAME }/export/employees_time/${ monthRange.start }/${ monthRange.end }`}
          >
            {
              intl.formatMessage({ id: 'download_report' })
            }
          </Button>
        </div>
      </Space>
    </>
  );
});
