import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';
import { IErrorResponse } from '../interfaces/common';
import httpStatus from 'http-status';

export const handleValidationError = (
  error: mongoose.Error.ValidationError
): IErrorResponse => {
  const errorMessages: IGenericErrorMessage[] = Object.values(error.errors).map(
    (err: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: err.path,
        message: err.message,
      };
    }
  );

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Validation Error',
    errorMessages,
  };
};
