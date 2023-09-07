import type Device from '../../drivers/sequelize/models/device'

class FindByRefId {
  deviceSqlModel: typeof Device

  constructor(deviceSqlModel: typeof Device) {
    this.deviceSqlModel = deviceSqlModel
  }

  async findByRefId(name: string): Promise<UserEntity> {
    const deviceData = await this.deviceSqlModel.findOne()

    const user: UserEntity = {}
    user.refId = name
    user.name = deviceData?.name

    return user
  }
}

export = FindByRefId
