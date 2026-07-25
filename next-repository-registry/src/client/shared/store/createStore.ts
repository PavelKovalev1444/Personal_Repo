import {type Reducer, configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware, {Saga} from 'redux-saga';

import {createReducerManager, createSagaManager} from './manager';
import {AppState, AppStateKey} from './types';

const sagaMiddleware = createSagaMiddleware();

type Props = {
    rootSaga: Saga;
    initialReducers: Partial<Record<AppStateKey, Reducer>>;
    preloadedState?: AppState;
};

export const createStore = ({preloadedState, rootSaga, initialReducers}: Props) => {
    const reducerManager = createReducerManager(initialReducers);
    const store = configureStore({
        preloadedState,
        reducer: reducerManager.reducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActionPaths: ['payload.file'],
                },
            }).concat(sagaMiddleware),
    });

    return Object.assign(store, {
        reducerManager,
        sagaManager: createSagaManager(sagaMiddleware.run, rootSaga),
    });
};
