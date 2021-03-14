import React from 'react';
import { Table } from 'antd';
import { View } from '../components';
import { columns, data } from './temporaryData';
import 'antd/dist/antd.css';
import '../css/HomeView.css';

export const HomeView = () => {
  return (
    <View>
      <Table columns={columns} dataSource={data} className="table"/>
    </View>
  );
};
