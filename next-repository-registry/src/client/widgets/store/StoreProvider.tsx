'use client';

import {ReactNode} from 'react';

import {Provider} from 'react-redux';
import {Reducer} from 'redux';
import {all, fork} from 'redux-saga/effects';

import {queryParams, updateQueryParamsSaga} from '@/client/entities/query-params';
import {AppStateKey, AppStore, createStore} from '@/client/shared/store';

function* rootSaga() {
    yield all([fork(updateQueryParamsSaga)]);
}

const initialReducers: Partial<Record<AppStateKey, Reducer>> = {
    queryParams,
};

let store: AppStore | null = null;

function getStore(): AppStore {
    if (!store) {
        store = createStore({
            rootSaga,
            initialReducers: {...initialReducers},
        });
    }

    return store;
}

export default function StoreProvider({children}: {children: ReactNode}) {
    const appStore = getStore();

    return <Provider store={appStore}>{children}</Provider>;
}
