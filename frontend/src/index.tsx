import React, { useState } from 'react';
import ReactDOM from 'react-dom';
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
  TaskView
} from './views';
import reportWebVitals from './reportWebVitals';
import { ProvideAuth } from './utils/auth';
import { PrivateRoute } from './components';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/apolloClient';
import { IntlProvider } from 'react-intl';
import pl from './lang/lang_pl.json';
import en from './lang/lang_en.json';
import plPL from 'antd/lib/locale/pl_PL';
import 'antd/dist/antd.css';

ReactDOM.render(
  <IntlProvider locale={ localStorage.getItem('lang') as any }
    defaultLocale="pl" messages={ localStorage.getItem('lang') === 'pl' ? pl : en as any }>
    <ConfigProvider locale={ plPL }>
      <ApolloProvider client={ client }>
        <ProvideAuth>
          <Router>
            <Switch>
              <PrivateRoute exact component={ HomeView } path='/'/>
              <PrivateRoute component={ CalendarView as any } path='/calendar'/>
              <PrivateRoute component={ ClientsView as any } path='/clients'/>
              <PrivateRoute component={ ApplicationsView as any } path='/applications'/>
              <PrivateRoute component={ TeamsView as any } path='/teams'/>
              <PrivateRoute component={ ProjectsView as any } path='/projects'/>
              <PrivateRoute component={ TaskView as any} path='/tasks'/>
              <PrivateRoute component={ ProjectAssignmentsView } path='/projectAssignments'/>
              <PrivateRoute component={ SubordinatesView as any } path='/subordinate'/>
            </Switch>
          </Router>
        </ProvideAuth>
      </ApolloProvider>
    </ConfigProvider>
  </IntlProvider>,
  document.getElementById('root')
);

reportWebVitals();
