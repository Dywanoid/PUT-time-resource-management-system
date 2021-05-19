import React from 'react';
import { TimesheetTable } from '../components';
import 'antd/dist/antd.css';
import '../css/HomeView.css';

export const HomeView= () : JSX.Element => {
  return (
    <div>
      <TimesheetTable/>
    </div>
  );
};
