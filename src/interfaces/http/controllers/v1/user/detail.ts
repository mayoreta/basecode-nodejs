import Joi from 'joi'
import UserRepository from '../../../../../repositories/user'
import User from '../../../../../drivers/sequelize/models/user'
import UserUsecase from '../../../../../usecases/user'
import { userDetailSerialize } from '../../../../../helpers/serializers/user/detail'

const detailUserValidator = Joi.object({
  userId: Joi.number().required(),
})

const detailUserController = async (req: any, res: any, next: any) => {
  try {
    const { params, user } = req
    const { userId } = await detailUserValidator.validateAsync({
      userId: params?.userId || user.aud,
    })

    const userRepository = new UserRepository(User)
    const userUsecase = new UserUsecase(userRepository)

    const result = await userUsecase.detailUser(userId)

    const response: HttpResponse = {
      message: 'OK',
      meta: null,
      data: await userDetailSerialize(result),
    }

    res.send(response)
  } catch (error) {
    next(error)
  }
}

export = detailUserController
