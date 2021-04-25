import { combineEpics } from 'redux-observable';
import { getTestEpic } from './test-actions';

const rootEpic = combineEpics(getTestEpic);

export { rootEpic };