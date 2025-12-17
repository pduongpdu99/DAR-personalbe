import { ChatCreate } from '@dto/chat-create'
import { ChatUpdate } from '@dto/chat-update'
import { Chat } from '@entities/chat.entity'
import { CRUDController } from '@impl/controller'
import { Controller, Post, Sse, UseInterceptors } from '@nestjs/common'
import { ChatService } from './chat.service'
import { ENDPOINT } from '@common/const'
import { FormatResponseInterceptor } from '@common/middlewares/format-response'
import { map, Subject } from 'rxjs'

@Controller(ENDPOINT.CHAT)
@UseInterceptors(FormatResponseInterceptor)
export class ChatController extends CRUDController<
  ChatCreate,
  ChatUpdate,
  Chat
> {
  private readonly event$ = new Subject<any>()

  constructor(service: ChatService) {
    super(service)
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
  async create(payload: ChatCreate) {
    this.event$.next(payload)
    return await super.create(payload)
  }
}
