export type ErrorType = unknown;
export type ErrorCallback = () => void;
export type StatusCodeCallback = (statusCode?: number | string) => void;

export interface HandleErrorOptions {
  onDone?: ErrorCallback;
  onStatus?: StatusCodeCallback;
}
