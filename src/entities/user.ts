import User from '../drivers/sequelize/models/user'
import { IUser } from '../drivers/mongoose/models/user'

declare global {
  type UserEntity = {
    id?: number
    username?: string
    password?: string
    refId?: string
    name?: string
  }
}

export const toUserEntityMongo = (
  userModel: IUser | null,
): UserEntity | null => {
  if (userModel) {
    const user: UserEntity = {
      name: userModel.name,
      refId: userModel.refId,
    }

    return user
  }

  return null
}

export const toUserEntity = (userModel: User | null): UserEntity | null => {
  if (userModel) {
    const user: UserEntity = {
      id: userModel.id,
      username: userModel.username,
      password: userModel.password,
      name: userModel.name,
      refId: userModel.refId,
    }

    return user
  }

  return null
}
