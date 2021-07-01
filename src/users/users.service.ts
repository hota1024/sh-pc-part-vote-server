import * as bcrypt from 'bcrypt'
import { BadRequestException, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { UserCreateDto } from './user.dto'
import { User } from './user.entity'
import { InjectRepository } from '@nestjs/typeorm'

/**
 * UserPublic type.
 */
export type UserPublic = Omit<User, 'passwordHash'>

@Injectable()
export class UsersService {
  @InjectRepository(User)
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
   * find a user by email.
   *
   * @param email email.
   */
  findByEmail(email: User['email']): Promise<User> {
    return this.usersRepo.findOne({
      email,
    })
  }

  /**
   * create a user by given data.
   *
   * @param data data.
   */
  async create(data: UserCreateDto): Promise<User> {
    const isEmailValid = await this.validateEmail(data.email)

    if (!isEmailValid) {
      throw new BadRequestException({
        message: 'このメールアドレスは既に使用されています。',
      })
    }

    const salt = bcrypt.genSaltSync(10)

    const user = this.usersRepo.create({
      email: data.email,
      passwordHash: bcrypt.hashSync(data.password, salt),
    })

    return this.usersRepo.save(user)
  }

  /**
   * validate the given email by checking it was already used.
   *
   * @param email email.
   */
  async validateEmail(email: string): Promise<boolean> {
    const user = await this.usersRepo.findOne({ email })
    console.log(user)

    return !user
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
