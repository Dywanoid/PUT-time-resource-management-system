
import React, {useState, useEffect} from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { columns, data } from '../utils/temporaryData';
import { getTestRequested } from '../actions/test-actions';
import 'antd/dist/antd.css';
import '../css/HomeView.css';

export const HomeView= () : JSX.Element => (
  <Table columns={columns} dataSource={data} className="table"/>
);
