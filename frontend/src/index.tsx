import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApplicationsView, CalendarView, ClientsView, HomeView, ProjectsView, ResourcesView, TaskView } from './views';
import reportWebVitals from './reportWebVitals';
import { ProvideAuth } from './utils/auth';
import { PrivateRoute } from './components';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';
import 'antd/dist/antd.css';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/apolloClient';

const store = configureStore({ reducer: rootReducer });

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={ store }>
      <ProvideAuth>
        <Router>
          <Switch>
            <PrivateRoute exact component={HomeView} path='/'/>
            <PrivateRoute component={CalendarView} path='/calendar'/>
            <PrivateRoute component={ResourcesView} path='/resources'/>
            <PrivateRoute component={ApplicationsView} path='/applications'/>
            <PrivateRoute component={ClientsView} path='/clients'/>
            <PrivateRoute component={ProjectsView} path='/projects'/>
            <PrivateRoute component={TaskView} path='/tasks'/>

          </Switch>
        </Router>
      </ProvideAuth>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);

reportWebVitals();
