import shortid from 'shortid-36'
import UserRepository from '../../repositories/user'
import { hashingPassword } from '../../helpers/bcrypt'
import { generateToken } from '../../helpers/jwt'

type ParamsCreateUser = {
  username: string
  password: string
  name: string
}

type ResultCreateUser = {
  accessToken: string
  refreshToken: string
  user: UserEntity
}

class CreateUser {
  userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async createUser(params: ParamsCreateUser): Promise<ResultCreateUser> {
    const userExists = await this.userRepository.findByUsername(params.username)
    if (userExists) {
      throw new Error('User already exists')
    }

    const refId = shortid.generate()
    const user = await this.userRepository.create({
      name: params.name,
      refId,
      password: await hashingPassword(params.password),
      username: params.username,
    })

    const accessToken = await generateToken({
      expiredInMinute: 60,
      secretKey: '123',
      data: {
        aud: user.id?.toString() || '-',
        role: 'USER',
      },
    })

    const refreshToken = await generateToken({
      expiredInMinute: 60 * 24 * 30,
      secretKey: '123',
      data: {
        aud: user.id?.toString() || '-',
        role: 'USER',
      },
    })

    return {
      user,
      accessToken,
      refreshToken,
    }
  }
}

export = CreateUser
