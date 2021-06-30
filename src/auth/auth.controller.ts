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
  async login(@Body() credentials: LoginDto): Promise<LoginRes> {
    const token = await this.auth.login(credentials)

    return {
      token,
    }
  }
}
