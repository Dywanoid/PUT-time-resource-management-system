import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';
import { testReducer } from './test-reducer';

const rootReducer = combineReducers({
  form,
  test: testReducer
});

export{ rootReducer };