import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CalendarView, HomeView, LoginPage } from './views';
import reportWebVitals from './reportWebVitals';
import { ProvideAuth } from './utils/auth';
import { PrivateRoute } from './components';
import 'antd/dist/antd.css';

ReactDOM.render(
  <ProvideAuth>
    <Router>
      <Switch>
        <Route exact path='/' component={LoginPage}/>
        <PrivateRoute component={CalendarView} path='/calendar'/>
        <PrivateRoute component={HomeView} path='/home'/>
      </Switch>
    </Router>
  </ProvideAuth>,
  document.getElementById('root')
);

reportWebVitals();
