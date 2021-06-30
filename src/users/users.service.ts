import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { User } from './user.entity'

/**
 * UserPublic type.
 */
export type UserPublic = Omit<User, 'passwordHash'>

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

  /**
   * returns user public data.
   *
   * @param user user.
   */
  toPublic(user: User): UserPublic {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...data } = user
    return data
  }
}
