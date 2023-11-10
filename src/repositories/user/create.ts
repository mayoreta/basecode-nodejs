import { UserModelMongo } from '../../drivers/mongoose/models/user'
import User from '../../drivers/sequelize/models/user'
import { toUserEntity, toUserEntityMongo } from '../../entities/user'

type ParamsCreateUser = {
  username: string
  password: string
  refId: string
  name: string
}

class Create {
  userSqlModel: typeof User
  userModelMongo: typeof UserModelMongo

  constructor(
    userSqlModel: typeof User,
    userModelMongo: typeof UserModelMongo,
  ) {
    this.userSqlModel = userSqlModel
    this.userModelMongo = userModelMongo
  }

  async create(params: ParamsCreateUser): Promise<UserEntity | null> {
    const user = await this.userSqlModel.create({
      username: params.username,
      password: params.password,
      refId: params.refId,
      name: params.name,
    })

    return toUserEntity(user)
  }

  async createMongo(id: string): Promise<UserEntity | null> {
    const user = await this.userModelMongo.findById(id)

    return toUserEntityMongo(user)
  }
}

export = Create
