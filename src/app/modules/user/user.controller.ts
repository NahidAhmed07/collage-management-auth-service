import { Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IUser } from './user.interface';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const bodyData = req.body;
  const { student, ...userData } = bodyData;
  const createdUser = await UserService.createStudent(student, userData);

  sendResponse(res, {
    success: true,
    data: createdUser,
    message: 'User created successfully',
    statusCode: httpStatus.OK,
  });
});

const createFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { faculty, ...userData } = req.body;
    const result = await UserService.createFaculty(faculty, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    });
  }
);

// const createAdmin: RequestHandler = catchAsync(
//   async (req: Request, res: Response) => {
//     const { admin, ...userData } = req.body;
//     const result = await UserService.createAdmin(admin, userData);

//     sendResponse<IUser>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Admin created successfully!',
//       data: result,
//     });
//   }
// );

export default {
  createStudent,
  createFaculty,
  // createAdmin,
};
