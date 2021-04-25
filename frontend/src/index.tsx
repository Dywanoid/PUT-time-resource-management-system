import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient, InMemoryCache, gql, createHttpLink} from '@apollo/client';

import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApplicationsView, CalendarView, HomeView, ResourcesView } from './views';
import reportWebVitals from './reportWebVitals';
import { ProvideAuth } from './utils/auth';
import { PrivateRoute } from './components';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';
import 'antd/dist/antd.css';

const store = configureStore({ reducer: rootReducer });

const link = createHttpLink({
  credentials: 'include',
  uri: 'http://localhost/graphql'
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});

client
  .query({
    query: gql`
    query {
      getClient(id: 2) {
        name
      }
    }
    `
  })
  .then((result) => alert(JSON.stringify(result)))
  .catch((error) => alert(error.message));

ReactDOM.render(
  <Provider store={ store }>
    <ProvideAuth>
      <Router>
        <Switch>
          <PrivateRoute exact component={HomeView} path='/'/>
          <PrivateRoute component={CalendarView} path='/calendar'/>
          <PrivateRoute component={ResourcesView} path='/resources'/>
          <PrivateRoute component={ApplicationsView} path='/applications'/>
        </Switch>
      </Router>
    </ProvideAuth>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
