import { Mixin } from 'ts-mixer'
import UserRepository from '../../repositories/user'
import CreateUser from './create-user'
import DetailUser from './detail-user'
import Login from './login'

class UserUsecase extends Mixin(class {}, CreateUser, DetailUser, Login) {
  userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    super()
    this.userRepository = userRepository
  }
}

export = UserUsecase
