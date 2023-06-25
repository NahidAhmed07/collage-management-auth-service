import { NextFunction, Request, Response } from 'express';
import { USER_ROLE } from '../../enum/user.enum';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import jwtHelper from '../helper/jwtHelper';
import config from '../../config';

const auth =
  (...allowedRoles: USER_ROLE[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'unauthorize user');
      }

      const verifiedUser = jwtHelper.verifyToken(
        token,
        config.jwt_secret as string
      );

      if (!verifiedUser) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Please Login first');
      }

      if (!allowedRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Access Denied');
      }

      req.user = verifiedUser;

      next();
    } catch (err) {
      next(err);
    }
  };

export default auth;
