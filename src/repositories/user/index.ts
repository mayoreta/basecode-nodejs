import findById from './find-by-id'
import findByName from './find-by-name'
import findByRefId from './find-by-ref-id'
import { Mixin } from 'ts-mixer'
import type User from '../../drivers/sequelize/models/user'
import type Client from '../../drivers/sequelize/models/client'
import type Device from '../../drivers/sequelize/models/device'

class UserRepository extends Mixin(
  class {},
  findByName,
  findByRefId,
  findById,
) {
  userSqlModel: typeof User
  clientSqlModel: typeof Client
  deviceSqlModel: typeof Device

  constructor(
    userSqlModel: typeof User,
    clientSqlModel: typeof Client,
    deviceSqlModel: typeof Device,
  ) {
    super()
    this.userSqlModel = userSqlModel
    this.deviceSqlModel = deviceSqlModel
    this.clientSqlModel = clientSqlModel
  }
}

export = UserRepository
