import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'
import { User } from 'src/users/user.entity'
import { UserPublic, UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'
import { LoginDto } from './auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

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

    if (user) {
      const isPasswordValid = bcrypt.compareSync(password, user.passwordHash)

      if (isPasswordValid) {
        return this.usersService.toPublic(user)
      }
    }
  }

  /**
   * sign user data by jwt.
   *
   * @param credentials credentials.
   */
  async login(credentials: LoginDto): Promise<string> {
    const user = await this.usersService.findByEmail(credentials.email)
    const userPublic = this.usersService.toPublic(user)

    return this.jwtService.sign(userPublic)
  }
}
