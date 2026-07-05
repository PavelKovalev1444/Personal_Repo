import {all, takeLeading} from 'redux-saga/effects';

import {fetchRepositoryListIterator} from './iterators';
import {fetchRepositoryListRequest} from './slices';

export function* repositoryListSaga() {
    yield all([takeLeading(fetchRepositoryListRequest, fetchRepositoryListIterator)]);
}
