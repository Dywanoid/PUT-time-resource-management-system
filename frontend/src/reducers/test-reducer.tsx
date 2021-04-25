import {
  GET_TEST_DONE,
  GET_TEST_FAILED,
  GET_TEST_REQUESTED
} from '../constants/test-constants';
import { GET_DATA_CANCEL } from '../constants/data-cancel-constants';

const initialState: TestState = {
  isError: false,
  isLoading: false,
  lang: 'pl',
  test: 'lol'
};

export type TestState = {
  isError: boolean,
  isLoading: boolean,
  lang: string,
  test: string
}

export const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEST_REQUESTED:
      return { ... state, isLoading: true, lang: action.lang };
    case GET_TEST_DONE:
      return { ... state, isLoading: false, test: action.test };
    case GET_TEST_FAILED:
      return { ... state, isError: true, isLoading: false };
    case GET_DATA_CANCEL:
    default:
      return state;
  }
};