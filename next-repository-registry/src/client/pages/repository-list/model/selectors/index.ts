import {createSelector} from '@reduxjs/toolkit';

import {State} from '../../types';

const selectRepositoryListPage = (state: State) => state?.repositoryListPage ?? null;

export const selectRepositoryList = createSelector(
    selectRepositoryListPage,
    (slice) => slice?.repositoryList ?? null,
);

export const selectRepositories = createSelector(
    selectRepositoryList,
    (slice) => slice?.items ?? [],
);
