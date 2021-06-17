import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import {
  ApplicationsView,
  CalendarView,
  ClientsView,
  HomeView,
  ProjectAssignmentsView,
  ResourcesView,
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
import 'antd/dist/antd.css';

ReactDOM.render(
  <ApolloProvider client={ client }>
    <ProvideAuth>
      <Router>
        <Switch>
          <PrivateRoute exact component={ HomeView } path='/'/>
          <PrivateRoute component={ CalendarView } path='/calendar'/>
          <PrivateRoute component={ ClientsView } path='/clients'/>
          <PrivateRoute component={ ResourcesView}  path='/resources'/>
          <PrivateRoute component={ ApplicationsView } path='/applications'/>
          <PrivateRoute component={ TeamsView } path='/teams'/>
          <PrivateRoute component={ ProjectsView } path='/projects'/>
          <PrivateRoute component={ TaskView } path='/tasks'/>
          <PrivateRoute component={ ProjectAssignmentsView } path='/projectAssignments'/>
          <PrivateRoute component={ ReportsView } path='/reports'/>
        </Switch>
      </Router>
    </ProvideAuth>
  </ApolloProvider>,
  document.getElementById('root')
);

reportWebVitals();
