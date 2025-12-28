import { ChatCreate } from '@dto/chat-create'
import { ChatUpdate } from '@dto/chat-update'
import { Chat } from '@entities/chat.entity'
import { CRUDController } from '@impl/controller'
import {
  Body,
  Controller,
  Inject,
  Post,
  Sse,
  UseInterceptors,
} from '@nestjs/common'
import { ChatService } from './chat.service'
import { ENDPOINT, AMQP_SERVICES } from '@common/const'
import { FormatResponseInterceptor } from '@common/middlewares/format-response'
import { map, Subject } from 'rxjs'
import { ClientRMQ, MessagePattern } from '@nestjs/microservices'

@Controller(ENDPOINT.CHAT)
@UseInterceptors(FormatResponseInterceptor)
export class ChatController extends CRUDController<
  ChatCreate,
  ChatUpdate,
  Chat
> {
  private readonly event$ = new Subject<any>()

  constructor(
    @Inject(AMQP_SERVICES.CHAT) private chatClient: ClientRMQ,
    service: ChatService,
  ) {
    super(service)
    void this.chatClient.connect()
  }

  @Sse('bot-response')
  retrieveBotRepsonse() {
    return this.event$.pipe(
      map((_: Record<string, unknown>) => ({
        message: 'hello world',
      })),
    )
  }

  @Post()
  send(@Body() payload: ChatCreate) {
    const routingKey = 'chat.bot'
    return this.chatClient.send(routingKey, { prompt: payload.content })
  }
}
