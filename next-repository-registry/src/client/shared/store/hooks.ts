'use client';

import {useLayoutEffect} from 'react';

import {Reducer} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector, useStore} from 'react-redux';
import {Saga} from 'redux-saga';

import {AppState, AppStateKey, AppStore} from './types';

export const useAppStore: () => AppStore = useStore as unknown as () => AppStore;

export const useDynamicReducer = (key: AppStateKey, reducer: Reducer, clearOnDestruct = false) => {
    const store = useAppStore();

    useLayoutEffect(() => {
        store.reducerManager.add(key, reducer);

        return () => {
            if (clearOnDestruct) {
                store.reducerManager.remove(key);
            }
        };
    }, [clearOnDestruct, key, reducer, store.reducerManager]);
};

export const useDynamicSaga = (key: string, saga: Saga, clearOnDestruct = false) => {
    const store = useAppStore();

    useLayoutEffect(() => {
        store.sagaManager.add(key, saga);

        return () => {
            if (clearOnDestruct) {
                store.sagaManager.remove(key);
            }
        };
    }, [clearOnDestruct, key, saga, store.reducerManager]);
};

export const useAppDispatch = () => useDispatch();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
