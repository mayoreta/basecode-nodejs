import { Op } from 'sequelize'
import type User from '../../drivers/sequelize/models/user'
import { toUserEntity } from '../../entities/user'

class Find {
  userSqlModel: typeof User

  constructor(userSqlModel: typeof User) {
    this.userSqlModel = userSqlModel
  }

  async find(
    params: {
      name?: string
      page: number
      perPage: number
    } = { page: 1, perPage: 20 },
  ): Promise<[Meta, UserEntity[]]> {
    const conditions: any = {}

    if (params.name) {
      conditions.name = { [Op.like]: `${params.name}%` }
    }

    const { rows, count } = await this.userSqlModel.findAndCountAll({
      where: conditions,
    })

    const users: UserEntity[] = rows.map((user) => toUserEntity(user))

    return [
      {
        page: params.page,
        perPage: params.perPage,
        totalPage: Math.ceil(count / params.perPage),
        total: count,
      },
      users,
    ]
  }
}

export = Find
