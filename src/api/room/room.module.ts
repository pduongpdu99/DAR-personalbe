import { Module } from '@nestjs/common'
import { RoomController } from './room.controller'
import { RoomService } from './room.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Room } from '@entities/room.entity'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  controllers: [RoomController],
  providers: [ConfigService, RoomService],
})
export class RoomModule {}
