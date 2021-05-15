import React from 'react';
import { Calendar, Badge, Select } from 'antd';
import 'antd/dist/antd.css';

const getListData = (value) => {
  let listData;

  switch (value.date()) {
    case 21:
      listData = [
        { content: 'Urlop - Tomek', key: '1', type: 'error'  }
      ];
      break;
    case 4:
      listData = [
        { content: 'Opieka - Jan Kowalski', key: '2', type: 'error' }
      ];
      break;
    case 5:
      listData = [
        { content: 'Opieka - Jan Kowalski', key: '3', type: 'error' }
      ];
      break;
    case 6:
      listData = [
        { content: 'Opieka - Jan Kowalski', key: '4', type: 'error' }
      ];
      break;
    case 7:
      listData = [
        { content: 'Opieka - Jan Kowalski', key: '5', type: 'error' }
      ];
      break;
    case 24:
      listData = [
        { content: 'Opieka - Piotr Nowak', key: '6', type: 'error' }
      ];
      break;
    case 28:
      listData = [
        { content: 'Opieka - Piotr Nowak', key: '7', type: 'error' }
      ];
      break;
    case 25:
      listData = [
        { content: 'Opieka - Piotr Nowak', key: '8', type: 'error' }
      ];
      break;
    case 27:
      listData = [
        { content: 'Opieka - Piotr Nowak', key: '9', type: 'error' }
      ];
      break;
    case 26:
      listData = [
        { content: 'Opieka - Piotr Nowak', key: '10', type: 'error' }
      ];
      break;
    case 10:
      listData = [
        { key: '11', pe: 'warning',  tycontent: 'Urlop - Mariusz.' },
        { key: '12', pe: 'success', tycontent: 'L4 - Piotr Nowak' }
      ];
      break;
    case 11:
      listData = [
        { key: '13', pe: 'success', tycontent: 'L4 - Piotr Nowak' }
      ];
      break;
    case 12:
      listData = [
        { content: 'L4 - Piotr Nowak.', key: '14', type: 'success' }
      ];
      break;
    case 14:
      listData = [
        { content: 'Urlop - Krzysztof', key: '15', type: 'warning' },
        { content: 'L4 - Jan Kowalski', key: '16', type: 'success' }
      ];
      break;
    case 20:
      listData = [
        { content: 'Urlop - Cyryl', key: '17', type: 'warning' },
        { content: 'L4 - Jan Kowalski', key: '18', type: 'success' }
      ];
      break;
    default:
  }

  return listData || [];
};

const dateCellRender = (value) => {
  const listData = getListData(value);

  return (
    <ul className="events">
      {listData.map((item) => (
        <li key={ item.key }>
          <Badge status={ item.type } text={ item.content }/>
        </li>
      ))}
    </ul>
  );
};

export const CalendarView = (): JSX.Element => (
  <div>
    <Select
      showSearch
      style={{ float:'right', marginLeft:'1%', marginTop: '0.8%', width: 200 }}
      placeholder="Wybierz Kategorię"
      optionFilterProp="children"
    />
    <Calendar dateCellRender={ dateCellRender }/>
  </div>
);
