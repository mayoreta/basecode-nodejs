import User from '../../drivers/sequelize/models/user'
import { toUserEntity } from '../../entities/user'

type ParamsCreateUser = {
  username: string
  password: string
  refId: string
  name: string
}

class Create {
  userSqlModel: typeof User

  constructor(userSqlModel: typeof User) {
    this.userSqlModel = userSqlModel
  }

  async create(params: ParamsCreateUser): Promise<UserEntity> {
    const user = await this.userSqlModel.create({
      username: params.username,
      password: params.password,
      refId: params.refId,
      name: params.name,
    })

    return toUserEntity(user)
  }
}

export = Create
