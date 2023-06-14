import { IGenericErrorMessage } from './error';

export type IErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type ISuccessResponse<T> = {
  success: boolean;
  data?: T | null;
  message?: string | null;
  statusCode: number;
  meta?: {
    total?: number;
    limit?: number;
    page?: number;
  };
};
