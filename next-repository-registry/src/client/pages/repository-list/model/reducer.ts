import {combineReducers} from 'redux';

import repositoryList from './slices/repositoryListSlice';

export const reducer = combineReducers({
    repositoryList,
});
