import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/users/user.entity'
import { UserPublic, UsersService } from 'src/users/users.service'
import { Repository } from 'typeorm'
import { PartBulkCreateDto, PartCreateDto } from './part.dto'
import { Part, PartType } from './part.entity'

/**
 * PartPublic type.
 */
export type PartPublic = {
  id: string
  name: string
  type: PartType
  votes: number
}

/**
 * VoteStatus type.
 */
export type VoteStatus = Record<PartType, number> & {
  all: number
}

@Injectable()
export class PartsService {
  constructor(
    @InjectRepository(Part)
    private readonly partsRepo: Repository<Part>,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    private readonly usersService: UsersService
  ) {}

  /**
   * create part and returns it.
   *
   * @param data data.
   */
  create(data: PartCreateDto): Promise<Part> {
    const part = this.partsRepo.create(data)

    return this.partsRepo.save(part)
  }

  /**
   * bulk create parts.
   *
   * @param data data.
   */
  bulkCreate(data: PartBulkCreateDto): Promise<Part[]> {
    const { names, type } = data
    const parts: Part[] = []

    for (const name of names) {
      parts.push(
        this.partsRepo.create({
          type,
          name,
        })
      )
    }

    return this.partsRepo.save(parts)
  }

  /**
   * delete part by given id.
   *
   * @param id id.
   */
  async delete(id: string): Promise<void> {
    await this.partsRepo.delete({ id })
  }

  /**
   * returns all public parts.
   */
  async listPublicParts(): Promise<PartPublic[]> {
    const parts = await this.partsRepo.find({ relations: ['users'] })

    return parts.map(this.toPublic)
  }

  /**
   * returns parts of the specified type.
   *
   * @param type type.
   */
  async listTypedPublic(type: PartType): Promise<PartPublic[]> {
    const parts = await this.partsRepo.find({
      where: {
        type,
      },
      relations: ['users'],
    })

    return parts.map(this.toPublic)
  }

  async setVote(userId: string, partId: string): Promise<UserPublic> {
    let user = await this.usersRepo.findOne(userId, { relations: ['parts'] })
    const part = await this.partsRepo.findOne(partId)
    const { status } = this.usersService.toPublic(user)

    const voteState = status[part.type]

    if (voteState) {
      if (voteState.id === partId) {
        return this.usersService.toPublic(user)
      }

      user.parts = user.parts.filter(({ type }) => type !== part.type)
    }
    user.parts.push(part)

    user = await this.usersRepo.save(user)

    return this.usersService.toPublic(user)
  }

  async deleteVote(userId: string, partId: string): Promise<UserPublic> {
    let user = await this.usersRepo.findOne(userId, { relations: ['parts'] })

    user.parts = user.parts.filter(({ id }) => id !== partId)

    user = await this.usersRepo.save(user)

    return this.usersService.toPublic(user)
  }

  /**
   * returns vote status.
   */
  async voteStatus(): Promise<VoteStatus> {
    const parts = await this.partsRepo.find({ relations: ['users'] })

    const cpu = this.aggregatePartsVote(parts, 'cpu')
    const motherboard = this.aggregatePartsVote(parts, 'motherboard')
    const cpuCooler = this.aggregatePartsVote(parts, 'cpuCooler')
    const pcCase = this.aggregatePartsVote(parts, 'pcCase')
    const pcCooler = this.aggregatePartsVote(parts, 'pcCooler')
    const gpu = this.aggregatePartsVote(parts, 'gpu')
    const rom = this.aggregatePartsVote(parts, 'rom')
    const ram = this.aggregatePartsVote(parts, 'ram')
    const powerSupply = this.aggregatePartsVote(parts, 'powerSupply')
    const all =
      cpu +
      motherboard +
      cpuCooler +
      pcCase +
      pcCooler +
      gpu +
      rom +
      ram +
      powerSupply

    const status: VoteStatus = {
      all,
      cpu,
      motherboard,
      cpuCooler,
      pcCase,
      pcCooler,
      gpu,
      rom,
      ram,
      powerSupply,
    }

    return status
  }

  /**
   * returns part public.
   *
   * @param part part.
   */
  toPublic(part: Part): PartPublic {
    return {
      id: part.id,
      name: part.name,
      type: part.type,
      votes: part.users?.length ?? 0,
    }
  }

  private aggregatePartsVote(parts: Part[], type: PartType): number {
    return parts
      .filter(({ type: t }) => t === type)
      .map(({ users }) => users.length)
      .reduce((v, i) => v + i, 0)
  }
}
