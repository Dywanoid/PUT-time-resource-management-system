import React from 'react';
import { Breadcrumb, Layout } from 'antd';
import { Navigation } from './Navigation';
import 'antd/dist/antd.css';
import '../css/View.css';

const { Content, Footer } = Layout;

export const View = ({ children }) => {
    return (
      <Layout>
        <Navigation/>
        <Content className="site-layout">
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
          <div className="site-layout-background">
            { children }
          </div>
        </Content>
        <Footer className="footer">©PRACUJTA</Footer>
      </Layout>
    );
  };
