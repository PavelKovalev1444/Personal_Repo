import type {QueryParamsState} from '../types';

type QueryParamValue = string | number | boolean;
type QueryParamsValue = QueryParamValue | Array<QueryParamValue | undefined> | undefined;

export const stringifyListFilter = (filter?: string[]) => filter?.join(',') || '';

export const getUrlSearchParamsFromQueryParams = (
    queryParams: Record<string, QueryParamsValue>,
) => {
    const searchParams = new URLSearchParams();

    Object.entries(queryParams).forEach(([key, value]) => {
        const values = Array.isArray(value) ? value : [value];

        values.forEach((item) => {
            if (item === undefined) return;

            const preparedValue = String(item);

            if (preparedValue.trim()) {
                searchParams.append(key, preparedValue);
            }
        });
    });

    return searchParams;
};

export const getQueryParamsFromLocation = () => {
    return Array.from(new URLSearchParams(location.search).entries()).reduce(
        (params, [key, value]) => {
            return Object.assign(params, {[key]: value});
        },
        {},
    );
};

export const transformQueryStringParamToArray = (
    value: undefined | string | string[],
): string[] => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    if (value.includes(',')) {
        return value.split(',');
    }

    return [value];
};

export const transformQueryStringParamToNumberArray = (
    value: undefined | string | string[],
): number[] => {
    return transformQueryStringParamToArray(value)
        .map((item) => Number(item))
        .filter((item) => !Number.isNaN(item));
};

export const transformSearchParamsToQueryState = (
    searchParams: Record<string, string | string[] | undefined>,
) => {
    return Object.entries(searchParams).reduce<Record<string, string>>((acc, [key, value]) => {
        if (Array.isArray(value)) {
            acc[key] = value.join(',');
            return acc;
        }
        acc[key] = value ?? '';
        return acc;
    }, {});
};

export const areValuesEqual = (current?: string | null, defaultValue?: string | null): boolean => {
    if (!current && !defaultValue) return true;
    if (!current || !defaultValue) return false;

    const currentArr = transformQueryStringParamToArray(current);
    const defaultArr = transformQueryStringParamToArray(defaultValue);

    if (currentArr.length !== defaultArr.length) return false;

    const defaultSet = new Set(defaultArr);
    return currentArr.every((item) => defaultSet.has(item));
};

export const extractParamsWithPrefix = (queryParams: QueryParamsState, prefix: string) => {
    const params: QueryParamsState = {};

    Object.keys(queryParams).forEach((key) => {
        if (key.startsWith(prefix)) {
            const paramKey = key.replace(prefix, '');
            params[paramKey] = queryParams[key];
        }
    });

    return params;
};
