import { CONFIGURATION } from '@common/const'
import { MessageCreate } from '@dto/message-create'
import { MessageUpdate } from '@dto/message-update'
import { Message } from '@entities/message.entity'
import { ParamHelper } from '@helpers/param'
import { CRUDImpl } from '@impl/service'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class MessageService extends CRUDImpl<MessageCreate, MessageUpdate, Message> {
  constructor(
    @InjectRepository(Message) messageRepo: Repository<Message>,
    config: ConfigService,
  ) {
    super()
    this.repo = messageRepo
    this.alias = CONFIGURATION.ORM.ALIAS.MESSAGE
    this.paramHelper = new ParamHelper(config)
  }
}
