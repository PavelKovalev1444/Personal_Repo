import {combineReducers} from '@reduxjs/toolkit';

import rootReducer from './rootReducer';

export const combinedReducer = combineReducers({
  root: rootReducer,
});
