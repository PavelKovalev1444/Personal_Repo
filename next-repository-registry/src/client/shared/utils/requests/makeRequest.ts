import {allValuesToString} from './allValuesToString';
import {throwRequestError} from './throwRequestError';

export const makeRequest = async (
    pathname: string,
    options: RequestInit,
    query?: Record<string, string | number | boolean | undefined> | URLSearchParams,
) => {
    const pathnameWithQuery = query
        ? `${pathname}?${new URLSearchParams(query instanceof URLSearchParams ? query : allValuesToString(query)).toString()}`
        : pathname;

    // const optionsWithCsrf = getRequestOptionsWithCsrfToken(options);
    const response = await fetch(pathnameWithQuery, options);

    let body;

    try {
        body = await response.json();
    } catch {
        body = {};
    }

    if (!response.ok || body.status > 300) {
        throwRequestError(response, body ?? {});
    }

    return body;
};
