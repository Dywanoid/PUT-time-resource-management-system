import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Switch } from 'react-router-dom';
import {
  ApplicationsView,
  CalendarView,
  HomeView,
  ResourcesView,
  TeamsView,
  ProjectsView,
  TaskView
} from './views';
import reportWebVitals from './reportWebVitals';
import { ProvideAuth } from './utils/auth';
import { PrivateRoute } from './components';
import 'antd/dist/antd.css';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/apolloClient';

ReactDOM.render(
  <ApolloProvider client={client}>
    <ProvideAuth>
      <Router>
        <Switch>
          <PrivateRoute exact component={ HomeView } path='/'/>
          <PrivateRoute component={ CalendarView } path='/calendar'/>
          <PrivateRoute component={ ResourcesView}  path='/resources'/>
          <PrivateRoute component={ ApplicationsView } path='/applications'/>
          <PrivateRoute component={ TeamsView } path='/teams'/>
          <PrivateRoute component={ ProjectsView } path='/projects'/>
          <PrivateRoute component={ TaskView } path='/tasks'/>
        </Switch>
      </Router>
    </ProvideAuth>
  </ApolloProvider>,
  document.getElementById('root')
);

reportWebVitals();
