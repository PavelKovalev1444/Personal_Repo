import qs from 'query-string';
import {SagaIterator} from 'redux-saga';
import {all, select, takeEvery} from 'redux-saga/effects';

import {selectQueryParams} from '../selectors';

import {resetQueryParams, updateQueryParams} from './slice';

function* syncQueryParamsWithLocationIterator(): SagaIterator {
    const queryParams = yield select(selectQueryParams);
    let newPath = window.location.origin + window.location.pathname;
    if (Object.keys(queryParams).length) {
        newPath += '?' + qs.stringify(queryParams).toString();
    }
    window.history.replaceState({}, '', newPath);
}

export function* updateQueryParamsSaga() {
    yield all([
        takeEvery(updateQueryParams, syncQueryParamsWithLocationIterator),
        takeEvery(resetQueryParams, syncQueryParamsWithLocationIterator),
    ]);
}
