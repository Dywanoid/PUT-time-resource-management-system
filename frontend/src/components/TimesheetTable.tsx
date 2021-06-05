import { DatePicker, Table, Typography, Space, notification } from 'antd';

import React, { useEffect, useMemo, useReducer, useState } from 'react';
import moment, { Moment } from 'moment';
import 'moment/locale/pl';
import locale from 'antd/es/date-picker/locale/pl_PL';

import '../css/TimesheetTable.css';
import { useGetTaskTreeQuery } from '../generated/graphql';
const { Text } = Typography;

const NUMBER_OF_MINUTES_IN_A_DAY = 24 * 60;

// TEMPORATY UTILS FOR DATA MOCKUP
function dates(current) {
  const week: Date[] = [];
  const dateToUse = new Date(current);

  // Starting Monday not Sunday
  dateToUse.setDate((dateToUse.getDate() - dateToUse.getDay() +1));
  for (let i = 0; i < 7; i++) {
    week.push(
      new Date(dateToUse)
    );
    dateToUse.setDate(dateToUse.getDate() +1);
  }

  return week;
}

const getWeekDates = (givenDate) =>
  dates(givenDate).map((date) => `${ date.getDate() }/${ date.getMonth()+1 }`);

// END OF UTILS
type Breakpoint = 'sm' | 'md' | 'lg';
interface TableColumn {
  align?: 'center'
  dataIndex: string;
  render?: React.FC;
  title: string;
  responsive?: Breakpoint[]
}

interface RowData {
  client: string;
  key: string;
  project: string;
  task: string;
  [dates: string]: string;
}

interface TimeComponentProps {
  columnKey: string;
  dispatch: React.Dispatch<Action>;
  rowIndex: number;
  value: string;
  rowsData: RowData[]
}

type Action =
{ type: 'timeChange', payload: string, index: number, key: string} |
  { type: 'setState', payload: RowData[]};

function reducer(state, action: Action) {
  switch (action.type) {
    case 'timeChange': {
      state[action.index][action.key] = `${ action.payload }`;

      return [...state];
    }
    case 'setState': {

      return [...action.payload];
    }
    default:
      throw new Error();
  }
}

const dataColumns : TableColumn[] = [{
  dataIndex: 'client',
  responsive: ['md'],
  title: 'Client'
},
{
  dataIndex: 'project',
  responsive: ['md'],
  title: 'Project'
},
{
  dataIndex: 'task',
  responsive: ['md'],
  title: 'Task'
}];

const sumColumn: TableColumn = {
  align: 'center',
  dataIndex: 'sum',
  responsive: ['md'],
  title: 'Suma'
};

const fromMinutesToTime = (givenMinutes: number): string => {
  const hours = `${ Math.floor(givenMinutes/60) }`;
  const minutes = `${ givenMinutes % 60 }`;

  return `${ hours.padStart(2, '0') }:${ minutes.padEnd(2, '0') }`;
};

const fromTimeToMinutes = (time) => {
  const [hours, minutes] = time.split(':');

  return parseInt(hours || 0) * 60 + parseInt(minutes || 0);
};

const attachFakeWeeks = (data, weekDates) =>
  data.map((d) => {
    const values = weekDates.reduce((acc, weekDate) => {
      const rand =  Math.floor(Math.random() * 17) * 15;

      acc[weekDate] = fromMinutesToTime(0);

      return acc;
    }, {});

    return { ...d, ...values };
  });

const calculateSums = (currentState, timeColumns) => {

  const getMinutesSum = (row) => timeColumns.reduce((acc, curr) => {
    const minutes = fromTimeToMinutes(row[curr.dataIndex]);

    return  acc + minutes;
  }, 0);

  const summedRows = currentState.map((row) => {
    row.sum = fromMinutesToTime(getMinutesSum(row));

    return row;
  });

  return summedRows;
};

const timeFormat = /[0-9]{0,2}:?[0-9]{0,2}/g;

const checkIfTimeFormat = (input: string): boolean => {
  const foundInput = input.match(timeFormat);

  return !!foundInput && input.length === foundInput[0].length;
};

const getColumnsMinuteSum = (rowsData, columnKey, { rowIndex, time } = { rowIndex: -1, time: -1 }) =>
  rowsData.reduce((sum, curr, i) => sum + (i === rowIndex ? time : fromTimeToMinutes(curr[columnKey])), 0);

const TimeComponent = ({ dispatch, rowsData, rowIndex, columnKey, value }: TimeComponentProps): JSX.Element => {
  const onChange = (event) => {
    const isPayloadTimeFormat = checkIfTimeFormat(`${ event.target.value }`);

    if(!isPayloadTimeFormat) {return;}

    dispatch({
      index: rowIndex,
      key: columnKey,
      payload: event.target.value,
      type: 'timeChange'
    });
  };

  const onBlur = (event) => {
    const isPayloadTimeFormat = checkIfTimeFormat(`${ event.target.value }`);

    if(!isPayloadTimeFormat) {return;}
    const time = fromTimeToMinutes(event.target.value);

    const sum = getColumnsMinuteSum(rowsData, columnKey, { rowIndex, time });
    const isTooMuch = sum > NUMBER_OF_MINUTES_IN_A_DAY;

    if(isTooMuch) {
      notification.error({
        description: 'Dzień ma tylko 24 godziny!',
        duration: 5,
        message: 'Za dużo godzin!'
      });
    }
    dispatch({
      index: rowIndex,
      key: columnKey,
      payload: fromMinutesToTime(isTooMuch ? 0 : time),
      type: 'timeChange'
    });
  };

  const onFocus = (event) => {
    if(event.target.value === '00:00') {
      event.target.select();
    }
  };

  return (
    <input
      className={`timeInput ${ value === '00:00' ? 'notFilled': '' }`}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
    />
  );
};

const getRenderAdder = (dispatch, state) => (column: TableColumn) => {
  return {
    ...column,
    render: function TimeInput(value, record, rowIndex) {

      return column.dataIndex === 'sum'
        ? (<Text strong>{value}</Text>)
        : (
          <TimeComponent
            rowsData={state}
            dispatch={dispatch}
            columnKey={`${ column.dataIndex }`}
            rowIndex={rowIndex}
            value={value}
          />
        );
    }
  };
};

const setTransformedData = (data, dispatch, weekDates) => {

  const transformedData: RowData[] = [];

  data?.clients?.forEach((client) => {
    client?.projects?.forEach((project) => {
      project?.tasks?.forEach((task) => {
        transformedData.push(
          {
            client: client.name,
            key: `${ client.id }+${ project.id }+${ task.id }`,
            project: project.name,
            task: task.name
          }
        );

      });
    });
  });

  dispatch({ payload: attachFakeWeeks(transformedData, weekDates), type: 'setState' });
};

export const TimesheetTable: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, []);
  const [fetched, setFetched] = useState(false);

  const renderAdder = getRenderAdder(dispatch, state);
  const { data, loading, error } = useGetTaskTreeQuery({ fetchPolicy: 'no-cache' });
  const [date, setDate] = useState<Moment>(() => moment());
  const weekDates = useMemo(() => getWeekDates(date), [date]);

  useEffect(
    () => {
      if(!fetched && !loading && !error) {
        setTransformedData(data, dispatch, weekDates);
        setFetched(true);
      }
    },
    [
      data,
      date,
      fetched,
      loading
    ]
  );

  if (loading || !fetched) {return <p>Loading...</p>;}
  if (error) {return <p>Error :(</p>;}

  const timeColumns: TableColumn[] = weekDates.map((weekDate) => {

    return {
      align: 'center',
      dataIndex: weekDate,
      responsive: ['sm'],
      title: weekDate
    };
  });

  const columns = [
    ...dataColumns,
    ...timeColumns.map(renderAdder),
    renderAdder(sumColumn)
  ];

  const dataSource = calculateSums(state, timeColumns);
  const onChangeForDataPicker = (d) => {
    setDate(d);
    setFetched(false);
  };

  const customFormat = (value) => {
    const firstDayOfWeek = value.clone().startOf('week').format('D/M/Y');
    const lastDayOfWeek = value.clone().endOf('week').format('D/M/Y');

    return `${ firstDayOfWeek }  -  ${ lastDayOfWeek }`;
  };

  return (
    <>
      <Space direction="vertical" size="middle">
        <Text strong>Wybór tygodnia:</Text>
        <DatePicker
          locale={locale}
          onChange={onChangeForDataPicker}
          picker="week"
          format={customFormat}
          value={date}
        />
        <Table
          bordered
          pagination={false}
          columns={columns}
          dataSource={dataSource}
          className="table"
          summary={(tableData) => {
            const dataIndexes = [...timeColumns, sumColumn].map(({ dataIndex }) => dataIndex);

            const summedColumnsRow = tableData.reduce(
              (acc, currentRow) => {
                dataIndexes.forEach((dataIndex) => {
                  if(!acc[dataIndex]) {
                    acc[dataIndex] = 0;
                  }

                  acc[dataIndex] += fromTimeToMinutes(currentRow[dataIndex]);
                });

                return acc;
              },
              {}
            );

            return (
              <>
                <Table.Summary.Row className="summaryRow">
                  <Table.Summary.Cell   colSpan={3} index={0}/>
                  {
                    dataIndexes.map(
                      (dataIndex, i) => (
                        <Table.Summary.Cell align="center" key={i+dataIndex} index={i+1}>
                          <Text
                            type={
                              NUMBER_OF_MINUTES_IN_A_DAY < summedColumnsRow[dataIndex] && dataIndex !== 'sum'
                                ? 'danger'
                                : undefined
                            }
                            strong
                          >
                            {fromMinutesToTime(summedColumnsRow[dataIndex])}
                          </Text>
                        </Table.Summary.Cell>
                      )
                    )
                  }
                </Table.Summary.Row>
              </>
            );}}
        />
      </Space>
    </>
  );
};
