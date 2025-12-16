import { MessageCreate } from '@dto/message-create'
import { MessageUpdate } from '@dto/message-update'
import { Message } from '@entities/message.entity'
import { CRUDController } from '@impl/controller'
import { Controller, UseInterceptors } from '@nestjs/common'
import { MessageService } from './message.service'
import { ENDPOINT } from '@common/const'
import { FormatResponseInterceptor } from '@common/middlewares/format-response'

@Controller(ENDPOINT.MESSAGE)
@UseInterceptors(FormatResponseInterceptor)
export class MessageController extends CRUDController<
  MessageCreate,
  MessageUpdate,
  Message
> {
  constructor(service: MessageService) {
    super(service)
  }
}
