import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Part } from './part.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Part])],
})
export class PartsModule {}
