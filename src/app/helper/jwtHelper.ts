import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../config';

const jwtHelper = {
  generateAccessToken: (id: string, role: string) => {
    return jwt.sign({ id, role }, config.jwt_secret as Secret, {
      expiresIn: config.jwt_expiration,
    });
  },

  generateRefreshToken: (id: string, role: string) => {
    return jwt.sign({ id, role }, config.jwt_refresh_secret as Secret, {
      expiresIn: config.jwt_refresh_expiration,
    });
  },

  verifyToken: (token: string, secret: string) => {
    return jwt.verify(token, secret) as JwtPayload;
  },
};

export default jwtHelper;
