import { CONFIGURATION } from '@common/const'
import { RoomCreate } from '@dto/room-create'
import { RoomUpdate } from '@dto/room-update'
import { Room } from '@entities/room.entity'
import { ParamHelper } from '@helpers/param'
import { CRUDImpl } from '@impl/service'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class RoomService extends CRUDImpl<RoomCreate, RoomUpdate, Room> {
  constructor(
    @InjectRepository(Room) roomRepo: Repository<Room>,
    config: ConfigService,
  ) {
    super()
    this.repo = roomRepo
    this.alias = CONFIGURATION.ORM.ALIAS.USER
    this.paramHelper = new ParamHelper(config)
  }
}
