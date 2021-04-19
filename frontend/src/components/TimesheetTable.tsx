import {Table} from 'antd';
import React, { useReducer } from 'react';
import {data } from '../utils/temporaryData';
import '../css/TimesheetTable.css';

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
  dataIndex: string;
  key: string;
  render?: React.FC;
  title: string;
}

interface TimeComponentProps {
  columnKey: string;
  value: string;
  rowIndex: number;
  dispatch: React.Dispatch<Action>;
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
  key: 'client',
  title: 'Client'
},
{
  dataIndex: 'project',
  key: 'project',
  title: 'Project'
},
{
  dataIndex: 'task',
  key: 'task',
  title: 'Task'
}];

const timeColumns: TableColumn[] = weekDates.map((date) => {

  return {
    dataIndex: date,
    key: date,
    title: date
  };
});

const sumColumn: TableColumn = {
  dataIndex: 'sum',
  key: 'sum',
  title: 'Sum'
};

const myData = data.map((d) => {
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

const calculateSums = (currentState) => {

  const getMinutesSum = (row) => timeColumns.reduce((acc, curr) => {
    const minutes = fromTimeToMinutes(row[curr.key]);

    return  acc + minutes;
  }, 0);

  return currentState.map((row) => {
    row.sum = fromMinutesToTime(getMinutesSum(row));

    return row;
  });
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
      return (<TimeComponent dispatch={dispatch} columnKey={`${ column.key }`} rowIndex={rowIndex} value={value}/>);
    }
  };
};

export const TimesheetTable: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, myData);
  const renderAdder = getRenderAdder(dispatch);

  const myColumns = [
    ...dataColumns,
    ...timeColumns.map(renderAdder),
    sumColumn
  ];

  return (
    <>
      <Table pagination={false} columns={myColumns} dataSource={calculateSums(state)} className="table"/>
    </>);
};
