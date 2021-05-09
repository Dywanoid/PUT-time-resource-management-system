import { combineReducers } from '@reduxjs/toolkit';
import { reducer as form } from 'redux-form';
import { testReducer } from './test-reducer';

const rootReducer = combineReducers({
  form,
  test: testReducer
});

export type RootState = ReturnType<typeof rootReducer>

export{ rootReducer };