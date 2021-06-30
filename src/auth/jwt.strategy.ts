import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserPublic } from 'src/users/users.service'

/**
 * JwtPayload type.
 */
export type JwtPayload = UserPublic

/**
 * document
 */
export class JetStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFormRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  validate(payload: JwtPayload): JwtPayload {
    return payload
  }
}
