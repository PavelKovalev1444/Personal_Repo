// eslint-disable-next-line camelcase
import {unstable_cache} from 'next/cache';

import {ExternalApiError} from './errors';

type QueryParams = Record<string, string | number | boolean | undefined>;

type ExternalApiClientOptions = {
    headers?: HeadersInit;
    revalidate?: number | false;
};

type RequestOptions = ExternalApiClientOptions & {
    query?: QueryParams;
};

export class ExternalApiClient {
    private readonly baseUrl: string;
    private readonly defaultOptions: ExternalApiClientOptions;

    constructor(baseUrl: string, defaultOptions: ExternalApiClientOptions = {}) {
        this.baseUrl = baseUrl.replace(/\/$/, '');
        this.defaultOptions = defaultOptions;
    }

    get<T>(path: string, options?: RequestOptions): Promise<T> {
        return this.cachedRequest<T>('GET', path, options);
    }

    private cachedRequest<T>(method: string, path: string, options?: RequestOptions): Promise<T> {
        const revalidate = options?.revalidate ?? this.defaultOptions.revalidate ?? 60;

        if (revalidate === false) {
            return this.request<T>(method, path, options);
        }

        const cacheKey = [this.baseUrl, method, path, JSON.stringify(options?.query ?? {})];

        return unstable_cache(() => this.request<T>(method, path, options), cacheKey, {
            revalidate,
        })();
    }

    private async request<T>(method: string, path: string, options?: RequestOptions): Promise<T> {
        const revalidate = options?.revalidate ?? this.defaultOptions.revalidate;
        const url = this.buildUrl(path, options?.query);

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    ...this.toHeadersRecord(this.defaultOptions.headers),
                    ...this.toHeadersRecord(options?.headers),
                },
                ...(revalidate === false ? {cache: 'no-store'} : {next: {revalidate}}),
            });

            const body = await this.parseBody(response);

            if (!response.ok) {
                throw new ExternalApiError(
                    `External API request failed: ${response.status} ${response.statusText}`,
                    response.status,
                    body,
                );
            }

            return body as T;
        } catch (error) {
            if (error instanceof ExternalApiError) {
                throw error;
            }

            throw new ExternalApiError(
                error instanceof Error ? error.message : 'Network error',
                502,
            );
        }
    }

    private buildUrl(path: string, query?: QueryParams): string {
        const normalizedPath = path.startsWith('/') ? path : `/${path}`;
        const url = new URL(`${this.baseUrl}${normalizedPath}`);

        if (query) {
            for (const [key, value] of Object.entries(query)) {
                if (value !== undefined) {
                    url.searchParams.set(key, String(value));
                }
            }
        }

        return url.toString();
    }

    private async parseBody(response: Response): Promise<unknown> {
        const contentType = response.headers.get('content-type') ?? '';

        if (!contentType.includes('application/json')) {
            return null;
        }

        try {
            return await response.json();
        } catch {
            return null;
        }
    }

    private toHeadersRecord(headers?: HeadersInit): Record<string, string> {
        if (!headers) {
            return {};
        }

        return Object.fromEntries(new Headers(headers).entries());
    }
}
