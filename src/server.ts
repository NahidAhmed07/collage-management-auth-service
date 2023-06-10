import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { logger, errorLogger } from './shared/logger'

async function run_server() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Connected to database')
    app.listen(config.port, () => {
      logger.info(`Server is running on port ${config.port}`)
    })
  } catch (err) {
    errorLogger.error('Error connecting to database', err)
  }
}

run_server()
