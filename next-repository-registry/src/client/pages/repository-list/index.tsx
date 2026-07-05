'use client';

import {useDynamicReducer, useDynamicSaga} from '@/client/shared/store';

import {reducer, repositoryListSaga} from './model';
import Page from './ui';

export default () => {
    useDynamicReducer('repositoryListPage', reducer, true);

    useDynamicSaga('repositoryList', repositoryListSaga, true);

    return <Page />;
};
