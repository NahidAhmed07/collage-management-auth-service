import express from 'express';
import userController from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidator } from './user.validation';

const userRouter = express.Router();

userRouter.post(
  '/create-student',
  validateRequest(UserValidator.CreateStudentZodSchema),
  userController.createStudent
);

userRouter.post(
  '/create-faculty',
  validateRequest(UserValidator.createFacultyZodSchema),
  userController.createFaculty
);

userRouter.post(
  '/create-admin',
  validateRequest(UserValidator.createAdminZodSchema),
  userController.createAdmin
);

export default userRouter;
