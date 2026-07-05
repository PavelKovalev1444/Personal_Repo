import {createSelector} from '@reduxjs/toolkit';

import {QueryParamsState, State} from '../types';

export const selectQueryParams = (state: State) => state.queryParams ?? {};

export const selectQueryParamsLength = createSelector(
    selectQueryParams,
    (params) => Object.keys(params).length,
);

export const selectQueryParamByName = createSelector(
    selectQueryParams,
    (_, paramName: string) => paramName,
    (params: QueryParamsState, name: string) => params?.[name],
);
