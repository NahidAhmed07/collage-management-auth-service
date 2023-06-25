import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';
import config from '../../../config';

const loginUser = catchAsync(async (req, res) => {
  const { ...loginData } = req.body;

  const result = await AuthService.loginUser(loginData);

  const { refreshToken, ...others } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.env === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Login successful',
    data: others,
    success: true,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;

  const result = await AuthService.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Refresh token successful',
    data: result,
    success: true,
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
};
