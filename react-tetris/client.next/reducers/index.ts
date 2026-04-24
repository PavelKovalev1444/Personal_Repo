import {combineReducers} from '@reduxjs/toolkit';

import rootReducer from './rootReducer';
import tetrisReducer from './tetrisReducer';

export const combinedReducer = combineReducers({
  root: rootReducer,
  tetris: tetrisReducer,
});
