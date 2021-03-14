import React from 'react';
import ReactDOM from 'react-dom';
import { Breadcrumb, Layout } from 'antd';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CalendarView, HomeView, LoginPage } from './views';
import reportWebVitals from './reportWebVitals';
import { ProvideAuth } from './utils/auth';
import { PrivateRoute } from './components';
import { Navigation } from './components/Navigation';
import 'antd/dist/antd.css';
import './css/Index.css';

const { Content, Footer } = Layout;


const layoutL = props => (
  <>
    <Navigation/>
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background">
      <Footer className="footer">©PRACUJTA</Footer>
    </div>
  </>
);

ReactDOM.render(
  <ProvideAuth>
    <Layout>
      <Router>
        <Switch>
          <Route exact path='/' component={() => (<LoginPage/>)}/>
          <PrivateRoute exact component={() => (<CalendarView/>)} layout={ layoutL } path='/calendar'/>
          <PrivateRoute exact component={() => (<HomeView/>)} layout={ layoutL } path='/home'/>
        </Switch>
      </Router>
    </Layout>
  </ProvideAuth>,
  document.getElementById('root')
);

reportWebVitals();
