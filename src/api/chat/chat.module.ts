import { Module } from '@nestjs/common'
import { ChatController } from './chat.controller'
import { ChatService } from './chat.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Chat } from '@entities/chat.entity'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
  controllers: [ChatController],
  providers: [ConfigService, ChatService],
})
export class ChatModule {}
