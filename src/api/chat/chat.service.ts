import { CONFIGURATION } from '@common/const'
import { ChatCreate } from '@dto/chat-create'
import { ChatUpdate } from '@dto/chat-update'
import { Chat } from '@entities/chat.entity'
import { ParamHelper } from '@helpers/param'
import { CRUDImpl } from '@impl/service'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class ChatService extends CRUDImpl<ChatCreate, ChatUpdate, Chat> {
  constructor(
    @InjectRepository(Chat) chatRepo: Repository<Chat>,
    config: ConfigService,
  ) {
    super()
    this.repo = chatRepo
    this.alias = CONFIGURATION.ORM.ALIAS.CHAT
    this.paramHelper = new ParamHelper(config)
  }
}
