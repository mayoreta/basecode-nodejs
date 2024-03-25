import express from 'express'
import helmet from 'helmet'
import requestIp from 'request-ip'
import expressUserAgent from 'express-useragent'
import httpErrors from 'http-errors'
import rawBody from './middlewares/raw-body'
import { serverLogger } from '../../helpers/logger'
import rawHeader from './middlewares/raw-header'
import errorHandler from './middlewares/error-handler'
import routers from './routes'
import { name as projectName } from '../../../package.json'
import { capitalCase } from 'change-case'

const port = process.env.HTTP_INTERNAL_PORT || 3001

const run = () => {
  const app = express()
  app.use(
    helmet({
      frameguard: false,
    }),
  )
  app.use(requestIp.mw())
  app.use(serverLogger)
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json({ limit: 1024102420, type: 'application/json' }))
  app.use(rawBody)
  app.use(rawHeader)
  app.use(expressUserAgent.express())
  app.get('/', (req: any, res: any) =>
    res.send(
      `API ${capitalCase(projectName)} (${process.env.INTERFACE}) for ${
        process.env.NODE_ENV
      }`,
    ),
  )
  app.use(routers)
  app.use((req, res, next) => {
    next(httpErrors.NotFound())
  })
  app.use(errorHandler)

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
  })
}

export = run
