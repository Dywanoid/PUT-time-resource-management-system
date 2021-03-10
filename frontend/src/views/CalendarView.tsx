import React from 'react';
import {Calendar } from 'antd';
import 'antd/dist/antd.css';
import './CalendarView.css';
import { View} from '../components';

export const CalendarView = () => {
  return (
      <View>
        <Calendar/>
      </View>
  );
};