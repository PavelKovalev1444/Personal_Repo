import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {Repository, RepositoryList} from '../../types';

const initialState: RepositoryList = {
    items: [],
};

const repositoryListSlice = createSlice({
    name: 'repositoryList',
    initialState,
    reducers: {
        fetchRepositoryListRequest: (state) => state,
        fetchRepositoryListSuccess: (state, {payload}: PayloadAction<Repository[]>) => {
            state.items = payload;
        },
        fetchRepositoryListFailure: (state) => state,
    },
});

export const {fetchRepositoryListRequest, fetchRepositoryListSuccess, fetchRepositoryListFailure} =
    repositoryListSlice.actions;

export default repositoryListSlice.reducer;
