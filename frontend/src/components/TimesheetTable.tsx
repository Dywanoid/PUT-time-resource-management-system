import {Table, Typography} from 'antd';
import React, { useReducer } from 'react';
import {data as temporaryData } from '../utils/temporaryData';
import '../css/TimesheetTable.css';
import { useGetTaskTreeQuery } from '../generated/graphql';
const { Text } = Typography;

// TEMPORATY UTILS FOR DATA MOCKUP
function dates(current) {
  const week: Date[] = [];

  // Starting Monday not Sunday
  current.setDate((current.getDate() - current.getDay() +1));
  for (let i = 0; i < 7; i++) {
    week.push(
      new Date(current)
    );
    current.setDate(current.getDate() +1);
  }

  return week;
}

const weekDates = dates(new Date()).map((date) => `${ date.getDate() }/${ date.getMonth()+1 }`);
// END OF UTILS

interface TableColumn {
  align?: 'center'
  dataIndex: string;
  render?: React.FC;
  title: string;
}

interface RowData {
  client: string;
  key: string;
  project: string;
  task: string;
}

interface TimeComponentProps {
  columnKey: string;
  dispatch: React.Dispatch<Action>;
  rowIndex: number;
  value: string;
}

type Action = { type: 'timeChange', payload: string, index: number, key: string};

function reducer(state, action: Action) {
  switch (action.type) {
    case 'timeChange': {
      state[action.index][action.key] = `${ action.payload }`;

      return [...state];
    }
    default:
      throw new Error();
  }
}

const dataColumns : TableColumn[] = [{
  dataIndex: 'client',
  title: 'Client'
},
{
  dataIndex: 'project',
  title: 'Project'
},
{
  dataIndex: 'task',
  title: 'Task'
}];

const sumColumn: TableColumn = {
  dataIndex: 'sum',
  title: 'Suma'
};

const attachFakeWeeks = (data) =>
  data.map((d) => {
    const values = weekDates.reduce((acc, weekDate) => {
      const rand =  Math.floor(Math.random() * 17) * 15;

      acc[weekDate] = `${ `${ Math.floor(rand/60) }:${ rand % 60 }` }`;

      return acc;
    }, {});

    return {...d, ...values};
  });

const myData = temporaryData.map((d) => {
  const values = weekDates.reduce((acc, weekDate) => {
    const rand =  Math.floor(Math.random() * 17) * 15;

    acc[weekDate] = `${ `${ Math.floor(rand/60) }:${ rand % 60 }` }`;

    return acc;
  }, {});

  return {...d, ...values};
});

const fromTimeToMinutes = (time) => {
  const [hours, minutes] = time.split(':');

  return parseInt(hours) * 60 + parseInt(minutes);
};

const fromMinutesToTime = (givenMinutes) => {
  const hours = Math.floor(givenMinutes/60);
  const minutes = givenMinutes % 60;

  return `${ hours }:${ minutes }`;
};

const calculateSums = (currentState, timeColumns) => {

  const getMinutesSum = (row) => timeColumns.reduce((acc, curr) => {
    const minutes = fromTimeToMinutes(row[curr.key]);

    return  acc + minutes;
  }, 0);

  const summedRows = currentState.map((row) => {
    row.sum = fromMinutesToTime(getMinutesSum(row));

    return row;
  });

  return summedRows;
};

const timeFormat = /[0-9]{0,2}:[0-9]{0,2}/g;

const checkIfTimeFormat = (input: string): boolean => {
  const foundInput = input.match(timeFormat);

  return !!foundInput && input.length === foundInput[0].length;
};

const TimeComponent = ({dispatch, rowIndex, columnKey, value}: TimeComponentProps): JSX.Element => {
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

  return (<input className="timeInput" value={value} onChange={onChange}/>);
};

const getRenderAdder = (dispatch) => (column: TableColumn) => {

  return {
    ...column,
    render: function TimeInput(value, record, rowIndex) {

      return column.dataIndex === 'sum'
        ? (<Text strong>{value}</Text>)
        : (<TimeComponent dispatch={dispatch} columnKey={`${ column.dataIndex }`} rowIndex={rowIndex} value={value}/>);
    }
  };
};

export const TimesheetTable: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, myData);
  const renderAdder = getRenderAdder(dispatch);
  const {data, loading, error} = useGetTaskTreeQuery({fetchPolicy: 'no-cache'});

  if (loading) {return <p>Loading...</p>;}
  if (error) {return <p>Error :(</p>;}

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

  const timeColumns: TableColumn[] = weekDates.map((date) => {

    return {
      align: 'center',
      dataIndex: date,
      key: date,
      title: date
    };
  });

  const columns = [
    ...dataColumns,
    ...timeColumns.map(renderAdder),
    renderAdder(sumColumn)
  ];

  const dataSource = calculateSums(attachFakeWeeks(transformedData), timeColumns);

  return (
    <Table
      bordered
      pagination={false}
      columns={columns}
      dataSource={dataSource}
      className="table"
      summary={(tableData) => {
        const dataIndexes = [...timeColumns, sumColumn].map(({dataIndex}) => dataIndex);

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

        dataIndexes.forEach((dataIndex) => {
          summedColumnsRow[dataIndex] = fromMinutesToTime(summedColumnsRow[dataIndex]);
        });

        return (
          <>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}/>
              <Table.Summary.Cell index={1}/>
              <Table.Summary.Cell index={2}/>
              {
                dataIndexes.map(
                  (dataIndex, i) => (
                    <Table.Summary.Cell key={i+dataIndex} index={i+3}>
                      <Text strong>{summedColumnsRow[dataIndex]}</Text>
                    </Table.Summary.Cell>
                  )
                )
              }
            </Table.Summary.Row>
          </>
        );}}
    />
  );
};
