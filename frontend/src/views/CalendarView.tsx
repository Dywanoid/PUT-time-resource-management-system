import React from 'react';
import { Layout, Breadcrumb, Calendar } from 'antd';
import 'antd/dist/antd.css';
import './CalendarView.css';
import {Navigation} from '../components';
const {Content, Footer } = Layout;

export const CalendarView = () => {
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
          <Calendar/>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>©PRACUJTA</Footer>
    </Layout>
  );
};