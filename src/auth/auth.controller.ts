import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { LoginDto } from './auth.dto'
import { AuthService } from './auth.service'

/**
 * LoginRes type.
 */
export type LoginRes = {
  token: string
}

@Controller('auth')
export class AuthController {
  private readonly auth: AuthService

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Body() credentials: LoginDto): LoginRes {
    return {
      token: this.auth.login(credentials),
    }
  }
}
