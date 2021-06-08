import { DatePicker, Table, Typography, Space, notification } from 'antd';

import React, { useContext, useEffect, useMemo, useReducer, useState } from 'react';
import moment, { Moment } from 'moment';
import 'moment/locale/pl';
import locale from 'antd/es/date-picker/locale/pl_PL';

import '../css/TimesheetTable.css';
import {
  useGetUserProjectsQuery,
  useTimeLogMutation,
  namedOperations,
  TimeLogMutationFn
} from '../generated/graphql';
import { UserContext } from '../utils/auth';
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
  dates(givenDate).map((date) => {
    const year = date.getFullYear();
    const month = (date.getMonth()+1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return {
      label: `${ day }/${ month }`,
      value: `${ year }-${ month }-${ day }`
    };
  });

// END OF UTILS
type Breakpoint = 'sm' | 'md' | 'lg';
interface TableColumn {
  align?: 'center'
  dataIndex: string;
  render?: React.FC;
  title: string;
  responsive?: Breakpoint[]
}

interface Data {
  loggedTime: {
    [date: string]: {
      [id: string]: number
    }
  };
  transformedData: RowData[]
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
  sendTimeLog: TimeLogMutationFn;
  rowIndex: number;
  record: RowData;
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

const getWeekEnds = (week: Moment) => {

  return {
    end: week.clone().endOf('week'),
    start: week.clone().startOf('week')
  };
};

const customDateFormat = (value) => {
  const { start, end } = getWeekEnds(value);

  const firstDayOfWeek = start.format('D/M/Y');
  const lastDayOfWeek = end.format('D/M/Y');

  return `${ firstDayOfWeek } - ${ lastDayOfWeek }`;
};

const formatDateForBackend = (date: Moment): string => date.format('YYYY-MM-DD');

const getIdsFromKey = (key:string): {[id: string] : string} => {
  const [clientId, projectId, taskId, projectAssignmentId] = key.split('+');

  return {
    clientId,
    projectAssignmentId,
    projectId,
    taskId
  };
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

const attachTime = (data, weekDates) =>
  data.transformedData.map((row) => {
    const { taskId } = getIdsFromKey(row.key);

    const values = weekDates.reduce((acc, weekDate) => {
      if(data.loggedTime?.[weekDate.value]?.[taskId]) {
        acc[weekDate.value] = fromMinutesToTime(data.loggedTime[weekDate.value][taskId]);
      } else {
        acc[weekDate.value] = fromMinutesToTime(0);
      }

      return acc;
    }, {});

    return { ...row, ...values };
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

const checkIfQuarterHourMultiples = (input: number) => input % 15 === 0;

const getColumnsMinuteSum = (rowsData, columnKey, { rowIndex, time } = { rowIndex: -1, time: -1 }) =>
  rowsData.reduce((sum, curr, i) => sum + (i === rowIndex ? time : fromTimeToMinutes(curr[columnKey])), 0);

const TimeComponent = ({
  columnKey,
  dispatch,
  record,
  rowIndex,
  rowsData,
  sendTimeLog,
  value
}: TimeComponentProps): JSX.Element => {
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
    const isMultipleOf15 = checkIfQuarterHourMultiples(time);
    const sum = getColumnsMinuteSum(rowsData, columnKey, { rowIndex, time });
    const isTooMuch = sum > NUMBER_OF_MINUTES_IN_A_DAY;

    if(!isMultipleOf15) {
      notification.warning({
        description: 'Zły format!',
        duration: 5,
        message: 'Wpisuj tylko wielokrotności 15 min!'
      });
    }

    if(isTooMuch) {
      notification.error({
        description: 'Dzień ma tylko 24 godziny!',
        duration: 5,
        message: 'Za dużo godzin!'
      });
    }
    const correctedTime = isTooMuch  || !isMultipleOf15 ? 0 : time;

    const  { taskId, projectAssignmentId } = getIdsFromKey(record.key);

    sendTimeLog({
      variables: {
        date: columnKey,
        duration: correctedTime,
        projectAssignmentId,
        taskId: taskId
      }
    });

    dispatch({
      index: rowIndex,
      key: columnKey,
      payload: fromMinutesToTime(correctedTime),
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

const getRenderAdder = ({ dispatch, sendTimeLog }, state) => (column: TableColumn) => {
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
            sendTimeLog={sendTimeLog}
            rowIndex={rowIndex}
            value={value}
            record={record}
          />
        );
    }
  };
};

const useUserTimeLogData = (userId, date, { setData, setError }) => {
  const { start: fromDate, end: toDate } = getWeekEnds(date);

  const { data, loading, error } = useGetUserProjectsQuery(
    {
      variables: {
        fromDate: formatDateForBackend(fromDate),
        toDate: formatDateForBackend(toDate),
        userId
      }
    }
  );

  useEffect(
    () => {
      if(error) {
        setError('There was a problem with API!');
      }

      if(
        !loading
      ) {
        const emptyResult: Data = { loggedTime: {}, transformedData: [] };

        const result = data?.projectAssignments?.reduce(
          (acc, assignment) => {

            assignment.timeLogs?.forEach((timeLog) => {
              if(!acc.loggedTime[timeLog.date]) {
                acc.loggedTime[timeLog.date] = {};
              }

              acc.loggedTime[timeLog.date][timeLog.task.id] = timeLog.duration;
            });

            const { id: clientId, name: clientName } = assignment.project.client;
            const { id: projectId, name: projectName } = assignment.project;

            assignment.project.tasks?.forEach((task) => {
              acc.transformedData.push(
                {
                  client: clientName,
                  key: `${ clientId }+${ projectId }+${ task.id }+${ assignment.id }`,
                  project: projectName,
                  task: task.name
                }
              );
            });

            return acc;
          },
          emptyResult
        ) || emptyResult;

        setData(result);
      }
    },
    [
      data,
      loading,
      error
    ]
  );
};

const useDataTransform = (data, weekDates, date, dispatch) => {
  useEffect(
    () => {
      if(data) {
        dispatch({ payload: attachTime(data, weekDates), type: 'setState' });
      }
    },
    [
      data,
      date
    ]
  );
};

const getTimeColumns = (weekDates): TableColumn[] =>
  weekDates.map((weekDate) => {
    return {
      align: 'center',
      dataIndex: weekDate.value,
      responsive: ['sm'],
      title: weekDate.label
    };
  });

export const TimesheetTable: React.FC = () => {
  const user = useContext(UserContext);
  const userId = user?.id as string;

  const [sendTimeLog] = useTimeLogMutation({ refetchQueries: [namedOperations.Query.GetUserProjects] });

  const [state, dispatch] = useReducer(reducer, []);
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState<Moment>(() => moment());

  const weekDates = useMemo(() => getWeekDates(date), [date]);
  const timeColumns = useMemo(() => getTimeColumns(weekDates), [date]);

  const renderAdder = getRenderAdder({ dispatch, sendTimeLog }, state);

  useUserTimeLogData(userId, date, { setData, setError });
  useDataTransform(data, weekDates, date, dispatch);

  if (error) {return <p>{error}</p>;}
  if (!state.length) {return <p>Loading...</p>;}

  const columns = [
    ...dataColumns,
    ...timeColumns.map(renderAdder),
    renderAdder(sumColumn)
  ];

  const dataSource = calculateSums(state, timeColumns);
  const onChangeForDataPicker = (d) => {
    setDate(d);
    dispatch({ payload: [], type: 'setState' });
  };

  return (
    <>
      <Space direction="vertical" size="middle">
        <Text strong>Wybór tygodnia:</Text>
        <DatePicker
          locale={locale}
          onChange={onChangeForDataPicker}
          picker="week"
          format={customDateFormat}
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
