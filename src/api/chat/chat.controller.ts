import { ChatCreate } from '@dto/chat-create'
import { ChatUpdate } from '@dto/chat-update'
import { Chat } from '@entities/chat.entity'
import { CRUDController } from '@impl/controller'
import { Controller, Sse, UseInterceptors } from '@nestjs/common'
import { ChatService } from './chat.service'
import { ENDPOINT } from '@common/const'
import { FormatResponseInterceptor } from '@common/middlewares/format-response'
import { interval, map } from 'rxjs'

@Controller(ENDPOINT.CHAT)
@UseInterceptors(FormatResponseInterceptor)
export class ChatController extends CRUDController<
  ChatCreate,
  ChatUpdate,
  Chat
> {
  constructor(service: ChatService) {
    super(service)
  }

  @Sse('bot-response')
  retrieveBotRepsonse() {
    const milisecs = 1000
    return interval(milisecs).pipe(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      map((_) => {
        return { hello: 'world' }
      }),
    )
  }
}
