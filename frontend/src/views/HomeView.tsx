import React from 'react';
import { Table } from 'antd';
import { columns, data } from './temporaryData';
import 'antd/dist/antd.css';
import '../css/HomeView.css';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const HomeView = () => (
  <Table columns={columns} dataSource={data} className="table"/>
);
