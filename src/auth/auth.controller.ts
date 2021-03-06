import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UserCreateDto } from 'src/users/user.dto'
import { UserPublic, UsersService } from 'src/users/users.service'
import { LoginDto } from './auth.dto'
import { AuthService } from './auth.service'

/**
 * LoginRes type.
 */
export type LoginRes = {
  token: string
}

/**
 * RegisterRes type.
 */
export type RegisterRes = {
  user: UserPublic
  token: string
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly users: UsersService
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() credentials: LoginDto): Promise<LoginRes> {
    const token = await this.auth.login(credentials)

    return {
      token,
    }
  }

  @Post('register')
  async register(@Body() data: UserCreateDto): Promise<RegisterRes> {
    const user = await this.users.create(data)
    const token = await this.auth.login(data)

    return {
      user: this.users.toPublic(user),
      token,
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  me(@Request() req: { user: UserPublic }): Promise<UserPublic> {
    return this.users.findById(req.user.id).then(this.users.toPublic)
  }
}
