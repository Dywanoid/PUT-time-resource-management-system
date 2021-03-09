import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './index.css';
import {CalendarView, HomeView, LoginView} from './views';
import reportWebVitals from './reportWebVitals';
import {ProvideAuth} from './utils/auth';
import { PrivateRoute } from './components';

ReactDOM.render(
  <ProvideAuth>
    <Router>
      <Switch>
        <PrivateRoute path='/calendar' component={CalendarView} />
        <PrivateRoute path='/home' component={HomeView} />
        <Route exact path='/' component={LoginView} />
      </Switch>
    </Router>
  </ProvideAuth>,
  document.getElementById('root')
);

reportWebVitals();
