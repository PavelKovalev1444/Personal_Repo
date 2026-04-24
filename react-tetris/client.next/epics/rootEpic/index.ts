import {combineEpics} from 'redux-observable';

import {tetrisKeyboardEpic} from '../tetrisEpic';

export const rootEpic = combineEpics(tetrisKeyboardEpic);
