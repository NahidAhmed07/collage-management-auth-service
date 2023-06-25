import express, { Application, NextFunction, Response, Request } from 'express';
import cors from 'cors';

import globalErrorHandler from './app/middleware/globalErrorHandler';

import routes from './app/routes';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';

const app: Application = express();

// custom Error class

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Application routes
app.use('/api/v1', routes);

// Global error handler
app.use(globalErrorHandler);

// not found route handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'not found',
    errorMessages: [
      {
        message: 'not found',
        path: req.originalUrl,
      },
    ],
  });

  next();
});

export default app;
