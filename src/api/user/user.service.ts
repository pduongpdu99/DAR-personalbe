import CONFIGURATION from '@common/const'
import { UserCreate } from '@dto/user-create'
import { UserUpdate } from '@dto/user-update'
import { User } from '@entities/user.entity'
import { ParamHelper } from '@helpers/param'
import { CRUDImpl } from '@impl/service'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class UserService extends CRUDImpl<UserCreate, UserUpdate, User> {
  constructor(
    @InjectRepository(User) userRepo: Repository<User>,
    config: ConfigService,
  ) {
    super()
    this.repo = userRepo
    this.alias = CONFIGURATION.ORM.ALIAS.USER
    this.paramHelper = new ParamHelper(config)
  }
}
