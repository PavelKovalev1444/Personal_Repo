import {useEffect} from 'react';

import {useAppDispatch} from '@/client/shared/store';

import {fetchRepositoryListRequest} from '../model';

import {RepositoriesTable} from './RepositoriesTable';

const RepositoryListPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchRepositoryListRequest());
    }, []);

    return (
        <>
            <RepositoriesTable />
        </>
    );
};

export default RepositoryListPage;
