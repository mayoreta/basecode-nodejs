import Joi from 'joi'
import User from '../../../../../drivers/sequelize/models/user'
import UserRepository from '../../../../../repositories/user'
import UserUsecase from '../../../../../usecases/user'

const createUserValidator = Joi.object({
  username: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
})

const createUserController = async (req: any, res: any, next: any) => {
  try {
    const { body } = req
    const { username, password, name } =
      await createUserValidator.validateAsync(body)

    const userRepository = new UserRepository(User)
    const userUsecase = new UserUsecase(userRepository)

    const result = await userUsecase.createUser({
      username,
      password,
      name,
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

export = createUserController
