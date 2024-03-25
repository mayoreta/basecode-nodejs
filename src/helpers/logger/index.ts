import log4js from 'log4js'
import { name as projectName } from '../../../package.json'
import { paramCase } from 'change-case'

const logconfig = {
  appenders: {
    cloudwatchLog: {
      type: 'log4js-cloudwatch-appender',
      layout: { type: 'messagePassThrough' },
      accessKeyId: process.env.CLOUDWATCH_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.CLOUDWATCH_SECRET_ACCESS_KEY || '',
      region: process.env.CLOUDWATCH_REGION || '',
      logGroup: process.env.CLOUDWATCH_LOG_GROUP || '',
      logStream: `${paramCase(projectName)}-log`,
      category: 'service',
    },
    cloudwatchAccess: {
      type: 'log4js-cloudwatch-appender',
      layout: { type: 'messagePassThrough' },
      accessKeyId: process.env.CLOUDWATCH_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.CLOUDWATCH_SECRET_ACCESS_KEY || '',
      region: process.env.CLOUDWATCH_REGION || '',
      logGroup: process.env.CLOUDWATCH_LOG_GROUP || '',
      logStream: `${paramCase(projectName)}-access`,
      category: 'http',
    },
    service: {
      type: 'file',
      filename: 'logs/service.log',
      maxLogSize: 102400000,
      backups: 50,
      category: 'service',
      layout: { type: 'messagePassThrough' },
    },
    access: {
      type: 'dateFile',
      filename: 'logs/access.log',
      pattern: 'backup-yyyy-MM-dd',
      backups: 3,
      category: 'http',
      layout: { type: 'messagePassThrough' },
    },
    devlog: {
      type: 'stdout',
      layout: { type: 'messagePassThrough' },
    },
  },
  categories: {
    default: {
      appenders: ['service'],
      level: 'ALL',
    },
    access: { appenders: ['access'], level: 'DEBUG' },
  },
}

if (process.env.NODE_ENV === 'local') {
  logconfig.categories.default.appenders.push('devlog')
}

if (
  ['production', 'sandbox', 'staging', 'dev'].includes(
    String(process.env.NODE_ENV),
  )
) {
  logconfig.categories = {
    default: {
      appenders: ['cloudwatchLog'],
      level: 'ALL',
    },
    access: { appenders: ['cloudwatchAccess'], level: 'ALL' },
  }
}

log4js.configure(logconfig)
const logger = log4js.getLogger('service')

type IAppLogger = {
  push: (type: any, action: any, message: any) => void
  trace: (action: any, message: any) => void
  debug: (action: any, message: any) => void
  info: (action: any, message: any) => void
  warn: (action: any, message: any) => void
  error: (action: any, message: any) => void
  fatal: (action: any, message: any) => void
}

const appLogger: IAppLogger = {
  trace: (action: any, message: any) => {
    appLogger.push('trace', action, message)
  },
  debug: (action: any, message: any) => {
    appLogger.push('debug', action, message)
  },
  info: (action: any, message: any) => {
    appLogger.push('info', action, message)
  },

  warn: (action: any, message: any) => {
    appLogger.push('warn', action, message)
  },

  error: (action: any, message: any) => {
    appLogger.push('error', action, message)
  },

  fatal: (action: any, message: any) => {
    appLogger.push('fatal', action, message)
  },
  push: (type: any, action: any, message: any) => {
    let newMessage: any = { message }
    if (typeof message === 'object') {
      newMessage = JSON.stringify(message)
    }

    let newData: any = {
      time: new Date(),
      type,
      interface: process.env.INTERFACE,
      action,
      data: newMessage,
    }
    if (['production', 'staging', 'dev'].includes(String(process.env.NODE_ENV)))
      newData = JSON.stringify(newData)
    if (type === 'trace') {
      logger.trace(newData)
    } else if (type === 'debug') {
      logger.debug(newData)
    } else if (type === 'info') {
      logger.info(newData)
    } else if (type === 'warn') {
      logger.warn(newData)
    } else if (type === 'error') {
      logger.error(newData)
    } else if (type === 'fatal') {
      logger.fatal(newData)
    }
  },
}

const serverLogger = log4js.connectLogger(log4js.getLogger('access'), {
  level: String(log4js.levels.INFO),
  format: (req, res, format) =>
    format(
      JSON.stringify({
        url: ':url',
        status: ':status',
        method: ':method',
        responseTime: `${req?.time || '-'}ms`,
        tokenType: req?.rawHeader?.['x-app-token-type'] || '-',
        tokenExpiredAt: req?.rawHeader?.['x-app-token-exp'] || '-',
        deviceId: req?.rawHeader?.['x-app-device-id'] || '-',
        userId: req?.rawHeader?.['x-app-user-id'] || '-',
        userType: req?.rawHeader?.['x-app-user-type'] || '-',
        headerData: req?.rawHeader || {},
        bodyData: req?.rawBody || {},
        rawData: req?.rawData || {},
        errorData: req?.errorData || {},
        remotedAddr: ':remote-addr',
        contentLength: ':content-length',
        referrer: ':referrer',
        userAgent: ':user-agent',
        interface: process.env.INTERFACE || '-',
      }),
    ),
})
export { appLogger, serverLogger }
