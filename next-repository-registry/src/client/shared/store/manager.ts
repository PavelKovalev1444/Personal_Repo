import {Reducer, combineReducers} from '@reduxjs/toolkit';
import {Saga, Task} from 'redux-saga';

import {AppState, AppStateKey} from './types';

export const createReducerManager = (initialReducers: Partial<Record<AppStateKey, Reducer>>) => {
    const reducers = {...initialReducers} as Record<AppStateKey, Reducer>;
    let combinedReducer = combineReducers(reducers);
    let keysToRemove: AppStateKey[] = [];

    const reducer: Reducer<AppState> = (state, action) => {
        if (state && keysToRemove.length > 0) {
            state = {...state};
            keysToRemove.forEach((key) => state && delete state[key]);
            keysToRemove = [];
        }

        return combinedReducer(state, action);
    };

    const add = (key: AppStateKey, reducer: Reducer) => {
        if (!key || reducers[key]) {
            return;
        }

        reducers[key] = reducer;
        combinedReducer = combineReducers(reducers);
    };

    const remove = (key: AppStateKey) => {
        if (!key || reducers[key]) {
            return;
        }

        delete reducers[key];
        keysToRemove.push(key);
        combinedReducer = combineReducers(reducers);
    };

    return {
        getReducerMap: () => reducers,
        reducer,
        add,
        remove,
    };
};

type RunSaga = (saga: Saga) => Task;

export const createSagaManager = (runSaga: RunSaga, rootSaga: Saga) => {
    const injectedSagas = new Map<string, Task>();

    const isInjected = (key: string) => injectedSagas.has(key);

    const add = (key: string, saga: Saga) => {
        if (isInjected(key)) return;

        const task = runSaga(saga);

        injectedSagas.set(key, task);
    };

    const remove = (key: string) => {
        const task = injectedSagas.get(key);
        if (!task) return;

        task.cancel();
        injectedSagas.delete(key);
    };

    add('root', rootSaga);

    return {add, remove, getSagaMap: () => [...injectedSagas.keys()]};
};
