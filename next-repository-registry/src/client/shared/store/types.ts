import {QueryParamsState} from '@/client/entities/query-params';
import {State as RepositoryListState} from '@/client/pages/repository-list/types';

import {createStore} from './createStore';

export type FullAppState = QueryParamsState & RepositoryListState;

export type AppState = Partial<FullAppState>;

export type AppStateKey = keyof AppState;

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
