import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Part } from './part.entity'
import { PartsService } from './parts.service'

@Module({
  imports: [TypeOrmModule.forFeature([Part])],
  providers: [PartsService],
})
export class PartsModule {}
