import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { User } from 'src/users/user.entity'
import { UserPublic } from 'src/users/users.service'
import { AuthService } from './auth.service'

/**
 * LocalStrategy class.
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    })
  }

  async validate(email: User['email'], password: string): Promise<UserPublic> {
    const user = await this.authService.validateUser(email, password)

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
