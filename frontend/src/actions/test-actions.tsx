import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { ofType } from 'redux-observable';
import { catchError, map, mergeMap, retryWhen, takeUntil, delay, take } from 'rxjs/operators';
import {
  GET_TEST_DONE,
  GET_TEST_FAILED,
  GET_TEST_REQUESTED
} from '../constants/test-constants';
import { GET_DATA_CANCEL } from '../constants/data-cancel-constants';

/* eslint-disable sort-vars */
const getTestRequested = (lang: string) => {
        return {
          isLoading: true,
          lang,
          type: GET_TEST_REQUESTED
        };
      }
      , getTestDone = (data) => {
        return {
          isLoading: false,
          test: data,
          type: GET_TEST_DONE
        };
      }
      , getTestFailed = (error) => {
        return {
          error,
          isLoading: false,
          type: GET_TEST_FAILED
        };
      }
      , getTestEpic = (action$) => action$.pipe(
        ofType(GET_TEST_REQUESTED),
        mergeMap((action) => ajax
          .getJSON('https://jsonplaceholder.typicode.com/todos/1')
          .pipe(
            map((response) => getTestDone(response)),
            retryWhen((error) => error.pipe( delay( 1000 ), take(3))),
            catchError((error) => of(getTestFailed(error))),
            takeUntil(action$.ofType(GET_DATA_CANCEL))
          ))
      );

export {
  getTestRequested,
  getTestEpic
};