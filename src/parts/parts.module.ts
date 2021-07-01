import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Part } from './part.entity'
import { PartsService } from './parts.service'
import { PartsController } from './parts.controller'
import { User } from 'src/users/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Part, User])],
  providers: [PartsService],
  controllers: [PartsController],
})
export class PartsModule {}
