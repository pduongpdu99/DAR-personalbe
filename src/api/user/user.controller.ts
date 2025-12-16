import { UserCreate } from '@dto/user-create'
import { UserUpdate } from '@dto/user-update'
import { User } from '@entities/user.entity'
import { CRUDController } from '@impl/controller'
import { Controller, UseInterceptors } from '@nestjs/common'
import { UserService } from './user.service'
import { ENDPOINT } from '@common/const'
import { FormatResponseInterceptor } from '@common/middlewares/format-response'

@Controller(ENDPOINT.USER)
@UseInterceptors(FormatResponseInterceptor)
export class UserController extends CRUDController<
  UserCreate,
  UserUpdate,
  User
> {
  constructor(service: UserService) {
    super(service)
  }
}
