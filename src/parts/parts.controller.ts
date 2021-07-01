import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
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
    this.checkAuthorization(authorization)

    return this.parts.create(data)
  }

  @Delete(':id')
  delete(
    @Param('id') id: string,
    @Headers('Authorization') authorization?: string
  ): Promise<void> {
    this.checkAuthorization(authorization)

    return this.parts.delete(id)
  }

  private checkAuthorization(authorization?: string) {
    if (!authorization) {
      throw new UnauthorizedException()
    }

    if (authorization !== process.env.ADMIN_KEY) {
      throw new UnauthorizedException()
    }
  }
}
