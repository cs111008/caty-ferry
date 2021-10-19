import { REQUEST_HEADERS } from "../constants/request-interceptor.constants";
import { HTTP_METHODS } from "../enums/http-methods.enum";

export const createRequestOptions = (url: string, method: HTTP_METHODS, headers?: any, body?: any): [string, { method: HTTP_METHODS, headers: any, body?: any }] => {
    let payload: [string, { method: HTTP_METHODS, headers: any, body?: any }] = [url,
        {
            method,
            headers: { ...REQUEST_HEADERS, ...headers }
        }];
    if (method === HTTP_METHODS.POST)
        payload[1].body = body || {};
    return payload;
};