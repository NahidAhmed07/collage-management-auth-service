import { ZodError, ZodIssue } from 'zod';
import { IErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';
import httpStatus from 'http-status';

const handleZodError = (error: ZodError): IErrorResponse => {
  const errorMessages: IGenericErrorMessage[] = error.issues.map(
    (issue: ZodIssue) => {
      return {
        message: issue.message,
        path: (issue?.path[issue.path.length - 1] as string) || '',
      };
    }
  );

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Validation Error',
    errorMessages,
  };
};

export default handleZodError;
