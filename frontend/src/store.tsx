import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import Immutable from 'immutable';
import { rootReducer } from './reducers/index';
import { rootEpic } from './actions/index';

/* eslint-disable sort-vars */
const initialState = Immutable.fromJS({test: 'abc'})
      , configureStore = () => {
        const epicMiddleware = createEpicMiddleware()
              , store = createStore(
                rootReducer,
                initialState,
                applyMiddleware(
                  epicMiddleware
                )
              );

        epicMiddleware.run(rootEpic);

        return store;
      };

export default configureStore;