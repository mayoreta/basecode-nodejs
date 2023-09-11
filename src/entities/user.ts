import User from '../drivers/sequelize/models/user'

declare global {
  type UserEntity = {
    id?: number
    username?: string
    password?: string
    refId?: string
    name?: string
  }
}

export const toUserEntity = (userModel: User | null): UserEntity => {
  const user: UserEntity = {}

  if (userModel) {
    user.id = userModel.id
    user.username = userModel.username
    user.password = userModel.password
    user.name = userModel.name
    user.refId = userModel.refId
  }

  return user
}
