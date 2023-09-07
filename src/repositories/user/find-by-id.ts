import type Client from '../../drivers/sequelize/models/client'

class FindById {
  clientSqlModel: typeof Client

  constructor(clientSqlModel: typeof Client) {
    this.clientSqlModel = clientSqlModel
  }

  async findById(name: string): Promise<UserEntity> {
    const clientData = await this.clientSqlModel.findOne()

    const user: UserEntity = {}
    user.refId = name
    user.name = clientData?.name

    return user
  }
}

export = FindById
