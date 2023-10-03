import Joi from 'joi'
import UserRepository from '../../../../../repositories/user'
import User from '../../../../../drivers/sequelize/models/user'
import UserUsecase from '../../../../../usecases/user'

const loginValidator = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
})

const loginController = async (req: any, res: any, next: any) => {
  try {
    const { body } = req
    const { username, password } = await loginValidator.validateAsync(body)

    const userRepository = new UserRepository(User)
    const userUsecase = new UserUsecase(userRepository)

    const result = await userUsecase.login({
      username,
      password,
    })

    const response: HttpResponse = {
      message: 'OK',
      meta: null,
      data: result,
    }

    res.send(response)
  } catch (error) {
    next(error)
  }
}

export = loginController
