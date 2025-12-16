import { Module } from '@nestjs/common'
import { UserController } from './message.controller'
import { UserService } from './message.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@entities/user.entity'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [ConfigService, UserService],
})
export class UserModule {}
