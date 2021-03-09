import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './index.css';
import {CalendarView, HomeView, LoginView} from './views';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path='/calendar' component={CalendarView} />
      <Route path='/home' component={HomeView} />
      <Route exact path='/' component={LoginView} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
