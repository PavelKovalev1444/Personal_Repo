import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {QueryParamsState} from '../types';

const initialState: QueryParamsState = {};

const queryParamsSlice = createSlice({
    name: 'queryParams',
    initialState,
    reducers: {
        updateQueryParams: (state, {payload}: PayloadAction<QueryParamsState>) => {
            return {
                ...state,
                ...payload,
            };
        },
        resetQueryParams: () => ({}),
        initQueryParams: (_, {payload}: PayloadAction<QueryParamsState>) => payload,
    },
});

export const {updateQueryParams, resetQueryParams, initQueryParams} = queryParamsSlice.actions;

export const {reducer} = queryParamsSlice;
