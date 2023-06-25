import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { loginZodSchema, refreshTokenZodSchema } from './auth.validation';
import { AuthController } from './auth.controller';

const AuthRouter = Router();

AuthRouter.post(
  '/login',

  validateRequest(loginZodSchema),
  AuthController.loginUser
);

AuthRouter.post(
  '/refresh-token',
  validateRequest(refreshTokenZodSchema),
  AuthController.refreshToken
);

export default AuthRouter;
