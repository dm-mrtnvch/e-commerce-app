export interface ErrorResponse {
  message: string;
  statusCode: number;
  errors: {
    code: string;
    message: string;
  }[];
}

export interface Pagination<T> {
  count: number;
  limit: number;
  offset: number;
  total: number;
  results: T[];
}

export interface LocalizedString {
  [key: string]: string;
}
