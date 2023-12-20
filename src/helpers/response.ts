/* eslint-disable no-param-reassign */
import { HttpStatusCode, isAxiosError } from 'axios';
import { type Context } from 'koa';

// eslint-disable-next-line import/prefer-default-export
export function sendResponse(
  ctx: Context,
  statusCode: HttpStatusCode | number = HttpStatusCode.Ok,
  message: string | undefined | null = '',
  data: object | undefined | null = {},
) {
  ctx.status = statusCode;
  ctx.body = data;
  ctx.message = message ?? '';
}

export function sendError(ctx: Context, error: any) {
  if (isAxiosError(error)) {
    // Handle AxiosError
    console.error('AxiosError:', error);
    sendResponse(ctx, error.response?.status, error.message, []);
  } else {
    // Handle other types of errors
    console.error('Other Error:', error);
    sendResponse(ctx, HttpStatusCode.InternalServerError, 'InternalServerError', []);
  }
}
