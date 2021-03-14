import React from 'react';
import { Table } from 'antd';
import { columns, data } from './temporaryData';
import 'antd/dist/antd.css';
import '../css/HomeView.css';

export const HomeView = () => {
  return (
    <Table columns={columns} dataSource={data} className="table"/>
  );
};
