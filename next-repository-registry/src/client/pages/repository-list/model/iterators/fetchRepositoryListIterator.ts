import {SagaIterator} from 'redux-saga';
import {call, put} from 'redux-saga/effects';

import {getRepositoryListRequest} from '../requests';
import {fetchRepositoryListFailure, fetchRepositoryListSuccess} from '../slices';

export function* fetchRepositoryListIterator(): SagaIterator {
    try {
        const result = yield call(getRepositoryListRequest, {});

        yield put(fetchRepositoryListSuccess(result));
    } catch (_err) {
        yield put(fetchRepositoryListFailure());
    }
}
