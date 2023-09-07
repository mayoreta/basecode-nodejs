import type User from '../../drivers/sequelize/models/user'

class FindByName {
  userSqlModel: typeof User

  constructor(userSqlModel: typeof User) {
    this.userSqlModel = userSqlModel
  }

  async findByName(name: string): Promise<UserEntity> {
    const userData = await this.userSqlModel.findOne()

    const user: UserEntity = {}
    user.refId = name
    user.name = userData?.name

    return user
  }
}

export = FindByName
