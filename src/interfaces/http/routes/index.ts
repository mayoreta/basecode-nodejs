import express from 'express'
import { capitalCase, paramCase } from 'change-case'
import requireDir from 'require-dir'
import { name as projectName } from '../../../../package.json'
const routesV1 = requireDir('./v1')

const routers = express.Router()

routers.get('/', (req: any, res: any) =>
  res.send(
    `API ${capitalCase(projectName)} (http) for ${process.env.NODE_ENV}`,
  ),
)

Object.keys(routesV1).forEach((routeName) => {
  const router = require(`./v1/${routeName}`)
  if (router) {
    routers.use(`/v1/${paramCase(routeName)}`, router?.())
  }
})

export = routers
