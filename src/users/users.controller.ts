import { Controller, Get, Param } from '@nestjs/common'
import { UserPublic, UsersService } from './users.service'

@Controller('users')
export class UsersController {
  private readonly users: UsersService

  @Get(':id')
  findById(@Param('id') id: string): Promise<UserPublic> {
    return this.users.findById(id).then(this.users.toPublic)
  }
}
