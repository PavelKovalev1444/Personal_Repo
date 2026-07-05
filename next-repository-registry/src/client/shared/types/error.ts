export class RequestError extends Error {
    status?: number;
    details?: Record<string, unknown>;
    error?: string;
    traceId?: string | null;
    code?: string;
    params?: Record<string, string>;
    type?: string;
}
