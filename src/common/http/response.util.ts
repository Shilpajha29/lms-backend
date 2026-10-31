export type ApiSuccess<T> = {
  success: true;
  message: string;
  data: T;
};

export type ApiError = {
  success: false;
  message: string;
  errors: string[];
};

export const successResponse = <T>(
  message: string,
  data: T,
): ApiSuccess<T> => ({
  success: true,
  message,
  data,
});

export const errorResponse = (message: string, errors: string[]): ApiError => ({
  success: false,
  message,
  errors,
});
