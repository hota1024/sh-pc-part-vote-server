import bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'
import { User } from 'src/users/user.entity'
import { UserPublic, UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
  private readonly usersService: UsersService

  /**
   * validate credentials and returns the user public.
   *
   * @param email email.
   * @param password password.
   */
  async validateUser(
    email: User['email'],
    password: string
  ): Promise<UserPublic | void> {
    const user = await this.usersService.findByEmail(email)

    if (user && bcrypt.compareSync(password, user.passwordHash)) {
      return this.usersService.toPublic(user)
    }
  }
}
