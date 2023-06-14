import { Response } from 'express';
import { ISuccessResponse } from '../interfaces/common';

const sendResponse = <T>(res: Response, data: ISuccessResponse<T>) => {
  res.status(data.statusCode).json({
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta || null,
    data: data.data || null,
  });
};

export default sendResponse;
