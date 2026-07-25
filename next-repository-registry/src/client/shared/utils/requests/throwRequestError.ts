import {RequestError} from '../../types';

export const throwRequestError = (response: Response, body?: any) => {
    const error = new RequestError(body?.message ?? body?.error);

    if (body) {
        error.status = body.status ?? response.status;
        error.details = body.details;
        error.message = body.message ?? body.error;
        error.error = body.error;
        error.code = body.code;
        error.params = body.params;
        error.type = body.type;
    }

    error.traceId = response.headers.get('x-req-id');

    throw error;
};
