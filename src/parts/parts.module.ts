import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Part } from './part.entity'
import { PartsService } from './parts.service'
import { PartsController } from './parts.controller'
import { User } from 'src/users/user.entity'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [TypeOrmModule.forFeature([Part, User]), UsersModule],
  providers: [PartsService],
  controllers: [PartsController],
})
export class PartsModule {}
