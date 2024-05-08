export interface ErrorResponse {
  message: string;
  statusCode: number;
  errors: {
    code: string;
    message: string;
  }[];
}
