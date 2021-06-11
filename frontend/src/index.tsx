import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider  } from 'antd';
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
import plPL from 'antd/lib/locale/pl_PL';
import 'antd/dist/antd.css';

ReactDOM.render(
  <ConfigProvider locale={ plPL }>
    <ApolloProvider client={ client }>
      <ProvideAuth>
        <Router>
          <Switch>
            <PrivateRoute exact component={ HomeView } path='/'/>
            <PrivateRoute component={ CalendarView } path='/calendar'/>
            <PrivateRoute component={ ClientsView } path='/clients'/>
            <PrivateRoute component={ ApplicationsView } path='/applications'/>
            <PrivateRoute component={ TeamsView } path='/teams'/>
            <PrivateRoute component={ ProjectsView } path='/projects'/>
            <PrivateRoute component={ TaskView } path='/tasks'/>
            <PrivateRoute component={ ProjectAssignmentsView } path='/projectAssignments'/>
            <PrivateRoute component={ SubordinatesView } path='/subordinate'/>
          </Switch>
        </Router>
      </ProvideAuth>
    </ApolloProvider>
  </ConfigProvider>,
  document.getElementById('root')
);

reportWebVitals();
