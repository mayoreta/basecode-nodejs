import { Mixin } from 'ts-mixer'

import type User from '../../drivers/sequelize/models/user'
import findById from './find-by-id'
import find from './find'
import findByUsername from './find-by-username'
import create from './create'

class UserRepository extends Mixin(
  class {},
  find,
  findByUsername,
  findById,
  create,
) {
  userSqlModel: typeof User

  constructor(userSqlModel: typeof User) {
    super()
    this.userSqlModel = userSqlModel
  }
}

export = UserRepository
