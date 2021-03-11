import React from 'react';
import {Table } from 'antd';
import 'antd/dist/antd.css';
import './HomeView.css';
import { View} from '../components';
import { columns, data } from './temporaryData';



export const HomeView = () => {
  return (
    <View>
      <Table columns={columns} dataSource={data} className="table" />
    </View>
  );
};