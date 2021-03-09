import React from 'react';
import { Layout, Breadcrumb, Table } from 'antd';
import 'antd/dist/antd.css';
import './HomeView.css';
import {Navigation} from '../components';
const { Content, Footer } = Layout;

const columns = [
  {
    title: 'client',
    dataIndex: 'client',
    key: 'client',
  },
  {
    title: 'project',
    dataIndex: 'project',
    key: 'project',
  },
  {
    title: 'task',
    dataIndex: 'task',
    key: 'task',
  },
  {
    title: 'time',
    key: 'time',
    dataIndex: 'time',
  }
];

const data = [
  {
    key: '1',
    client: 'KFC',
    project: 'Kubełek',
    task: 'kurczak',
    time: 10,
  },
  {
    key: '2',
    client: 'KFC',
    project: 'grander',
    task: 'kurczak',
    time: 60,
  },
  {
    key: '3',
    client: 'KFC',
    project: 'bsmart',
    task: 'wołowina',
    time: 40,
  },
  {
    key: '4',
    client: 'KFC',
    project: 'zinger',
    task: 'kurczak',
    time: 60,
  },
  {
    key: '5',
    client: 'KFC',
    project: 'grander texas',
    task: 'kurczak',
    time: 50,
  },
  {
    key: '6',
    client: 'Jim Green',
    project: 'Kubełek',
    task: 'kurczak',
    time: 20,
  },
  {
    key: '7',
    client: 'Joe Black',
    project: 'Kubełek',
    task: 'kurczak',
    time: 10,
  }
];

export const HomeView = () => {
  return (
    <Layout>
      <Navigation/>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
          <Table columns={columns} dataSource={data} className="table" />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>©PRACUJTA</Footer>
    </Layout>
  );
};