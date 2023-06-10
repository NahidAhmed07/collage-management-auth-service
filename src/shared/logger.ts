import { createLogger, format, transports } from 'winston'
import path from 'path'
import DailyRotateFile from 'winston-daily-rotate-file'
const { combine, timestamp, label, printf } = format

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)

  return `${date.toDateString()} • ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} • [${label}] • ${level}: ${message}.`
})

// Create the transport for success logs using DailyRotateFile to log successes and delete them after 14 days
const successRotateTransport: DailyRotateFile = new DailyRotateFile({
  filename: path.join(
    process.cwd(),
    'logs',
    'successes',
    'CM-success-%DATE%.log'
  ),
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
})

// creating error transport instance using DailyRotateFile to log errors and delete them after 14 days
const errorRotateTransport: DailyRotateFile = new DailyRotateFile({
  filename: path.join(process.cwd(), 'logs', 'errors', 'CM-error-%DATE%.log'),
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
})

// Create the logger instance for success logs
const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'CM_AUTH' }), timestamp(), myFormat),
  transports: [new transports.Console(), successRotateTransport],
})

// Create the logger instance for error logs
const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'CM_AUTH_ERROR' }), timestamp(), myFormat),
  transports: [new transports.Console(), errorRotateTransport],
})

export { logger, errorLogger }