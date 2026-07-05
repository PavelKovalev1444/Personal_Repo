import {NextResponse} from 'next/server';

import {Repository} from '@/client/pages/repository-list/types';
import {GitHubApiClient} from '@/server/github';

const githubApiClient = new GitHubApiClient();

const impl = async (): Promise<NextResponse<Repository[]>> => {
    const data = await githubApiClient.searchRepositories('stars:>1');

    return NextResponse.json(data.items);
};

export const GET = impl;
