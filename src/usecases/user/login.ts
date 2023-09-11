import { validatePassword } from '../../helpers/bcrypt'
import { generateToken } from '../../helpers/jwt'
import UserRepository from '../../repositories/user'

type ParamsLogin = {
  username: string
  password: string
}

type ResultLogin = {
  accessToken: string
  refreshToken: string
}

class Login {
  userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async login(params: ParamsLogin): Promise<ResultLogin> {
    const user = await this.userRepository.findByUsername(params.username)

    if (Object.keys(user).length === 0) {
      throw new Error('Invalid username or password')
    }

    if (!(await validatePassword(params.password, user.password as string))) {
      throw new Error('Invalid username or password')
    }

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
      accessToken,
      refreshToken,
    }
  }
}

export = Login
