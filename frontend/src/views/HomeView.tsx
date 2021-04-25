
import React, {useState, useEffect} from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { columns, data } from '../utils/temporaryData';
import { getTestRequested } from '../actions/test-actions';
import 'antd/dist/antd.css';
import '../css/HomeView.css';
import { RootState } from '../reducers';

export const HomeView= () : JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTestRequested('pl'));
  }, [dispatch]);

  const lang = useSelector((state: RootState) => state.test.lang);
  const dispatchChangeLang = (newLang: string) => dispatch(getTestRequested(newLang));

  console.log(lang);

  return (
    <div>
      <span>{lang}</span>
      <button onClick={() => dispatchChangeLang('en')}>change language</button>
      <Table columns={columns} dataSource={data} className="table"/>
    </div>
  );
};
