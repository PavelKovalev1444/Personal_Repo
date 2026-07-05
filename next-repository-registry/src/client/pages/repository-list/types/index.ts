export type Repository = any;

export type GetRepositoryListParams = {
    query?: string;
};

export type RepositoryList = {
    items: Repository[];
};

export type RepositoryListPageState = {
    repositoryList: RepositoryList;
};

export type State = {
    repositoryListPage?: RepositoryListPageState;
};
