import {configureStore, Tuple} from '@reduxjs/toolkit';
import {createEpicMiddleware} from 'redux-observable';

import {rootEpic} from '../epics';
import {combinedReducer} from '../reducers';

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer: combinedReducer,
  middleware: () => new Tuple(epicMiddleware),
});

epicMiddleware.run(rootEpic);

export default store;
