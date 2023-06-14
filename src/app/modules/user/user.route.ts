import express from 'express';
import userController from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidator } from './user.validation';

const userRouter = express.Router();

userRouter.post(
  '/create-user',
  validateRequest(UserValidator.CreateUserZodSchema),
  userController.createUser
);

export default userRouter;
