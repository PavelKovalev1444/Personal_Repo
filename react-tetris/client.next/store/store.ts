import {configureStore, Tuple} from '@reduxjs/toolkit';
import {createEpicMiddleware} from 'redux-observable';

import {combinedReducer} from '../reducers';

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer: combinedReducer,
  middleware: () => new Tuple(epicMiddleware),
});

export default store;
