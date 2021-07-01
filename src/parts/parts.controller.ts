import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UnauthorizedException,
} from '@nestjs/common'
import { PartCreateDto } from './part.dto'
import { Part } from './part.entity'
import { PartPublic, PartsService } from './parts.service'

@Controller('parts')
export class PartsController {
  constructor(private readonly parts: PartsService) {}

  @Get()
  listPublic(): Promise<PartPublic[]> {
    return this.parts.listPublicParts()
  }

  @Post()
  create(
    @Body() data: PartCreateDto,
    @Headers('Authorization') authorization?: string
  ): Promise<Part> {
    if (!authorization) {
      throw new UnauthorizedException()
    }

    if (authorization !== process.env.ADMIN_KEY) {
      throw new UnauthorizedException()
    }

    return this.parts.create(data)
  }
}
