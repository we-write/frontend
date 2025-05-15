export type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};

export type ApiError = {
  status: number;
  message: string;
};
