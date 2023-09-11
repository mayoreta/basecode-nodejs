import UserRepository from '../../repositories/user'

class DetailUser {
  userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async detailUser(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findById(userId)

    if (Object.keys(user).length === 0) {
      throw new Error('User not found')
    }

    return user
  }
}

export = DetailUser
