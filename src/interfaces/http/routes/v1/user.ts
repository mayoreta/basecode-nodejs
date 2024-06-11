import express from 'express'
import userController from '../../controllers/v1/user'
import authentication from '../../middlewares/authentication'

const routers = () => {
  const router = express.Router()

  router.post('/register', userController.registerController)
  router.post('/login', userController.loginController)
  router.get(
    '/me',
    authentication(['USER']),
    userController.detailUserController,
  )
  router.get(
    '/:userId',
    authentication(['USER']),
    userController.detailUserController,
  )

  return router
}

export = routers
