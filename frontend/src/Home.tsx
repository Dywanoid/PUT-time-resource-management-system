import React from 'react';
import { Layout, Menu, Breadcrumb, Table } from 'antd';
import {Link } from 'react-router-dom';
import pracujta from './pracujta.png';
import 'antd/dist/antd.css';
import './Home.css';
const { Header, Content, Footer } = Layout;

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

class Home extends React.Component {

render() {
  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 999, width: '100%' }}>
      <Link to="/">
        <img className="logo" src={pracujta} alt="pracujta"/>
      </Link>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} className="buttons">
          <Menu.Item key="1">
            <Link to="/home" className="nav-text">Logowanie czasu</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/calendar" className="nav-text">Calendar</Link>
          </Menu.Item>
          <Menu.Item key="3">nav 4</Menu.Item>
          <Menu.Item key="4">nav 5</Menu.Item>
          <Menu.Item key="5">nav 6</Menu.Item>
          <Menu.Item key="6">nav 7</Menu.Item>
        </Menu>
      </Header>
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
}
}

export default Home;
