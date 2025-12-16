import { Module } from '@nestjs/common'
import { MessageController } from './message.controller'
import { MessageService } from './message.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Message } from '@entities/message.entity'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [MessageController],
  providers: [ConfigService, MessageService],
})
export class MessageModule {}
