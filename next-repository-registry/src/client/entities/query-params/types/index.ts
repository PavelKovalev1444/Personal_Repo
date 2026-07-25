export type QueryParamsState = {
    [key: string]: string | undefined;
};

export type State = {
    queryParams?: QueryParamsState;
};
