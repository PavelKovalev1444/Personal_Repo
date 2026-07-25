import {GetRepositoryListParams} from '../../types';

export const getRepositoryListRequest = async ({query}: GetRepositoryListParams) => {
    const response = await fetch('/api/repositories/search', {
        method: 'GET',
    });

    const json = await response.json();

    return json;
};
