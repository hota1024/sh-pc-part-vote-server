import { UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { User } from 'src/users/user.entity'
import { UserPublic } from 'src/users/users.service'
import { AuthService } from './auth.service'

/**
 * LocalStrategy class.
 */
export class LocalStrategy extends PassportStrategy(Strategy) {
  private authService: AuthService

  async validate(email: User['email'], password: string): Promise<UserPublic> {
    try {
      const user = await this.authService.validateUser(email, password)

      if (!user) {
        throw new UnauthorizedException()
      }

      return user
    } catch {
      throw new UnauthorizedException()
    }
  }
}
