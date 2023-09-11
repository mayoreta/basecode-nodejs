import Joi from 'joi'
import User from '../../../../../drivers/sequelize/models/user'
import UserRepository from '../../../../../repositories/user'
import UserUsecase from '../../../../../usecases/user'

const paramsCreateUser = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
})

const createUserController = async (req: any, res: any, next: any) => {
  try {
    const { body } = req
    const validated = await paramsCreateUser.validateAsync(body)

    const userRepository = new UserRepository(User)
    const userUsecase = new UserUsecase(userRepository)

    const result = await userUsecase.createUser({
      name: validated.name,
      username: validated.username,
      password: validated.password,
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
