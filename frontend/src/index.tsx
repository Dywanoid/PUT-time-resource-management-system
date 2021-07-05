import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import {
  ApplicationsView,
  CalendarView,
  ClientsView,
  HomeView,
  ProjectAssignmentsView,
  SubordinatesView,
  TeamsView,
  ProjectsView,
  TaskView,
  ReportsView
} from './views';
import reportWebVitals from './reportWebVitals';
import { ProvideAuth } from './utils/auth';
import { PrivateRoute } from './components';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/apolloClient';
import pl from './lang/lang_pl.json';
import en from './lang/lang_en.json';
import plPL from 'antd/lib/locale/pl_PL';
import enEN from 'antd/lib/locale/en_US';
import 'antd/dist/antd.css';

ReactDOM.render(
  <IntlProvider locale={ localStorage.getItem('lang') || 'pl' }
    defaultLocale="pl" messages={ localStorage.getItem('lang') === 'pl' ? pl : en }>
    <ConfigProvider locale={ localStorage.getItem('lang') === 'pl' ? plPL : enEN}>
      <ApolloProvider client={ client }>
        <ProvideAuth>
          <Router>
            <Switch>
              <PrivateRoute exact component={ HomeView as any } path='/'/>
              <PrivateRoute component={ CalendarView as any } path='/calendar'/>
              <PrivateRoute component={ ClientsView as any } path='/clients'/>
              <PrivateRoute component={ ApplicationsView as any } path='/applications'/>
              <PrivateRoute component={ TeamsView as any } path='/teams'/>
              <PrivateRoute component={ ProjectsView as any } path='/projects'/>
              <PrivateRoute component={ TaskView as any} path='/tasks'/>
              <PrivateRoute component={ ProjectAssignmentsView  as any } path='/projectAssignments'/>
              <PrivateRoute component={ SubordinatesView as any} path='/subordinate'/>
              <PrivateRoute component={ ReportsView as any} path='/reports'/>
            </Switch>
          </Router>
        </ProvideAuth>
      </ApolloProvider>
    </ConfigProvider>
  </IntlProvider>,
  document.getElementById('root')
);

reportWebVitals();
