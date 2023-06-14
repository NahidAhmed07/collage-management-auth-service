/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import config from '../../config';
import { IGenericErrorMessage } from '../../interfaces/error';
import { handleValidationError } from '../../errors/handleValidationError';
import ApiError from '../../errors/ApiError';
import { errorLogger } from '../../shared/logger';
import { ZodError } from 'zod';
import handleZodError from '../../errors/handleZodError';
import httpStatus from 'http-status';
import handleCastErrorDB from '../../errors/handleCastError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let message = 'Something went wrong';
  let errorMessages: IGenericErrorMessage[] = [];

  if (config.env === 'development') {
    // eslint-disable-next-line no-console
    console.log(error);
  } else {
    errorLogger.error(error);
  }
  // handle mongoose ValidationError
  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }
  // handle mongoose CastError when id is invalid
  else if (error?.name === 'CastError') {
    const simplifiedError = handleCastErrorDB(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }
  // handle mongoose duplicate error when unique field is duplicated in database
  else if (error?.code === 11000) {
    statusCode = httpStatus.CONFLICT;
    message = 'Duplicate field value entered';
    errorMessages = [{ message: 'Duplicate field value entered', path: '' }];
  }

  // handle zod ValidationError when request body is invalid
  else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }
  // handle ApiError which is a custom error class
  else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [{ message: error.message, path: '' }]
      : [];
  }
  // handle Error class this is default express error class
  else if (error instanceof Error) {
    message = error?.message;
    // message = error
    errorMessages = error?.message
      ? [{ message: error.message, path: '' }]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env === 'development' ? error.stack : undefined,
  });
};

export default globalErrorHandler;
