import mongoose from 'mongoose';
import { IErrorResponse } from '../interfaces/common';
import httpStatus from 'http-status';

const handleCastErrorDB = (err: mongoose.Error.CastError): IErrorResponse => {
  return {
    message: `Invalid ${err.path}: ${err.value}`,
    statusCode: httpStatus.BAD_REQUEST,
    errorMessages: [
      {
        path: err.path,
        message: 'Invalid ID',
      },
    ],
  };
};

export default handleCastErrorDB;
