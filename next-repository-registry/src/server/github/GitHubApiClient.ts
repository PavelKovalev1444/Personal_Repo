import {Repository} from '@/client/pages/repository-list/types';
import {ExternalApiClient} from '@/server/api';

type GitHubSearchResponse = {
    items: Repository[];
};

export class GitHubApiClient {
    private readonly client: ExternalApiClient;

    constructor() {
        this.client = new ExternalApiClient('https://api.github.com', {
            headers: {
                Accept: 'application/vnd.github+json',
            },
            revalidate: 3600,
        });
    }

    searchRepositories(query: string): Promise<GitHubSearchResponse> {
        return this.client.get<GitHubSearchResponse>('/search/repositories', {
            query: {q: query},
        });
    }
}
