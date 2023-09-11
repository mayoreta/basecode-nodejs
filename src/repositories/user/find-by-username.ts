import User from '../../drivers/sequelize/models/user'
import { toUserEntity } from '../../entities/user'

class FindByUsername {
  userSqlModel: typeof User

  constructor(userSqlModel: typeof User) {
    this.userSqlModel = userSqlModel
  }

  async findByUsername(username: string): Promise<UserEntity> {
    const userData = await this.userSqlModel.findOne({ where: { username } })

    return toUserEntity(userData)
  }
}

export = FindByUsername
