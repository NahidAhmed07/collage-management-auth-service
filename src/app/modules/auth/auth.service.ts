import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import User from './../user/user.model';
import { ILogin, ILoginResponse } from './auth.interface';
import jwtHelper from '../../helper/jwtHelper';
import config from '../../../config';

const loginUser = async (payload: ILogin): Promise<ILoginResponse> => {
  const { id, password } = payload;

  const userExisted = await User.isUserExisted(id);
  if (!userExisted) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isPasswordMatched = await User.isPasswordMatched(
    password,
    userExisted.password
  );
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { role, needsPasswordChange } = userExisted;

  // generate access token and refresh token
  const accessToken = jwtHelper.generateAccessToken(id, role);
  const refreshToken = jwtHelper.generateRefreshToken(id, role);

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let verifiedUser = null;

  try {
    verifiedUser = await jwtHelper.verifyToken(
      token,
      config.jwt_refresh_secret as string
    );
  } catch (err) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid refresh Token');
  }

  const userExisted = await User.isUserExisted(verifiedUser.id);

  if (!userExisted) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found');
  }

  const refreshToken = jwtHelper.generateRefreshToken(
    userExisted.id,
    userExisted.role
  );

  return {
    refreshToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
