import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  private readonly usersRepo: Repository<User>

  /**
   * find a user by id.
   *
   * @param id user id.
   */
  findById(id: User['id']): Promise<User> {
    return this.usersRepo.findOne(id)
  }
}
