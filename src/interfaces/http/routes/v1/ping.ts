import express from 'express'
import ping from '../../controllers/v1/ping'

const routers = () => {
  const router = express.Router()

  router.get('/', ping)

  return router
}

export = routers
