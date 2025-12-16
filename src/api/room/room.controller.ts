import { RoomCreate } from '@dto/room-create'
import { RoomUpdate } from '@dto/room-update'
import { Room } from '@entities/room.entity'
import { CRUDController } from '@impl/controller'
import { Controller, UseInterceptors } from '@nestjs/common'
import { RoomService } from './room.service'
import { ENDPOINT } from '@common/const'
import { FormatResponseInterceptor } from '@common/middlewares/format-response'

@Controller(ENDPOINT.ROOM)
@UseInterceptors(FormatResponseInterceptor)
export class RoomController extends CRUDController<
  RoomCreate,
  RoomUpdate,
  Room
> {
  constructor(service: RoomService) {
    super(service)
  }
}
