import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { logger, errorLogger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;

async function run_server() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Connected to database');
    server = app.listen(config.port, () => {
      logger.info(`Server is running on port ${config.port}`);
    });
  } catch (err) {
    errorLogger.error('Error connecting to database', err);
  }

  process.on('uncaughtException', error => {
    errorLogger.error(error);
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

run_server();
