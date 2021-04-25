import React from 'react';
import ReactDOM from 'react-dom';
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
