import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './index.css';
import Home from './Home';
import Login from './Login';
import CalendarComponent from './Calendar';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path='/calendar' component={CalendarComponent} />
      <Route path='/home' component={Home} />
      <Route exact path='/' component={Login} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
