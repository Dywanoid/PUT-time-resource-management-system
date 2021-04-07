import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApplicationsView, CalendarView, HomeView, LoginPage, ResourcesView } from './views';
import reportWebVitals from './reportWebVitals';
import { ProvideAuth } from './utils/auth';
import { PrivateRoute } from './components';
import 'antd/dist/antd.css';

ReactDOM.render(
  <ProvideAuth>
    <Router>
      <Switch>
        <Route exact path='/' component={LoginPage}/>
        <PrivateRoute component={HomeView} path='/home'/>
        <PrivateRoute component={CalendarView} path='/calendar'/>
        <PrivateRoute component={ResourcesView} path='/resources'/>
        <PrivateRoute component={ApplicationsView} path='/applications'/>
      </Switch>
    </Router>
  </ProvideAuth>,
  document.getElementById('root')
);

reportWebVitals();
