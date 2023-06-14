import { Request, Response } from 'express';
import userService from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const bodyData = req.body;

  const createdUser = await userService.createUser(bodyData);

  sendResponse(res, {
    success: true,
    data: createdUser,
    message: 'User created successfully',
    statusCode: httpStatus.OK,
  });
});

export default {
  createUser,
};
