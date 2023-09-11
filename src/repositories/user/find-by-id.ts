import User from '../../drivers/sequelize/models/user'
import { toUserEntity } from '../../entities/user'

class FindById {
  userSqlModel: typeof User

  constructor(userSqlModel: typeof User) {
    this.userSqlModel = userSqlModel
  }

  async findById(id: number): Promise<UserEntity | null> {
    const userData = await this.userSqlModel.findOne({ where: { id } })

    return toUserEntity(userData)
  }
}

export = FindById
