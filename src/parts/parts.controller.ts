import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
  Request,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UserPublic } from 'src/users/users.service'
import { PartCreateDto } from './part.dto'
import { Part, PartType, PartTypes } from './part.entity'
import { PartPublic, PartsService, VoteStatus } from './parts.service'

@Controller('parts')
export class PartsController {
  constructor(private readonly parts: PartsService) {}

  @Get()
  listPublic(): Promise<PartPublic[]> {
    return this.parts.listPublicParts()
  }

  @Get('/typed/:type')
  listTypedPublic(@Param('type') type: PartType): Promise<PartPublic[]> {
    if (!PartTypes.includes(type)) {
      throw new BadRequestException({
        message: `パーツのタイプは ${PartTypes.join(
          ','
        )} のいずれかで指定してください。`,
      })
    }

    return this.parts.listTypedPublic(type)
  }

  @Post()
  create(
    @Body() data: PartCreateDto,
    @Headers('Authorization') authorization?: string
  ): Promise<Part> {
    this.checkAuthorization(authorization)

    return this.parts.create(data)
  }

  @Get('status')
  status(): Promise<VoteStatus> {
    return this.parts.voteStatus()
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

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/vote')
  vote(
    @Request() req: { user: UserPublic },
    @Param('id') id: string
  ): Promise<UserPublic> {
    return this.parts.setVote(req.user.id, id)
  }
}
