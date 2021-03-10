import React from 'react';
import { Breadcrumb, Layout } from 'antd';
import 'antd/dist/antd.css';
import {Navigation} from './Navigation';
const { Content, Footer } = Layout;

export const View = ({children}) => {
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
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>©PRACUJTA</Footer>
      </Layout>
    );
  };