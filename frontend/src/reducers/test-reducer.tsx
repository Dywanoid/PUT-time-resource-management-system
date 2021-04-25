import Immutable from 'immutable';
import {
  GET_TEST_DONE,
  GET_TEST_FAILED,
  GET_TEST_REQUESTED
} from '../constants/test-constants';
import { GET_DATA_CANCEL } from '../constants/data-cancel-constants';

const initialState = Immutable.Map({
  isError: false,
  isLoading: false,
  lang: 'pl',
  test: 'lol'
});

export const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEST_REQUESTED:
      return state.merge({ isLoading: true, lang: action.lang });
    case GET_TEST_DONE:
      return state.merge({ isLoading: false, test: action.test });
    case GET_TEST_FAILED:
      return state.merge({ isError: true, isLoading: false });
    case GET_DATA_CANCEL:
    default:
      return state;
  }
};