import Joi from 'joi'
import User from '../../../../../drivers/sequelize/models/user'
import UserRepository from '../../../../../repositories/user'
import UserUsecase from '../../../../../usecases/user'
import { userDetailSerialize } from '../../../../../helpers/serializers/user/detail'

const createUserValidator = Joi.object({
  username: Joi.string().required(),
  full_name: Joi.string().required(),
  password: Joi.string().required(),
})

const createUserController = async (req: any, res: any, next: any) => {
  try {
    const { body } = req
    const {
      username,
      password,
      full_name: fullName,
    } = await createUserValidator.validateAsync(body)

    const userRepository = new UserRepository(User)
    const userUsecase = new UserUsecase(userRepository)

    const result = await userUsecase.createUser({
      username,
      password,
      name: fullName,
    })

    const serializedData = await userDetailSerialize(result.user)

    const response: HttpResponse = {
      message: 'OK',
      meta: null,
      data: {
        access_token: result.accessToken,
        refresh_token: result.refreshToken,
        user_data: serializedData,
      },
    }

    res.send(response)
  } catch (error) {
    next(error)
  }
}

export = createUserController
