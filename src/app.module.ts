import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { UserModule } from './api/user/user.module'
import { CONFIGURATION } from '@common/const'
import { DBModule } from '@common/modules/db'
import { RoomModule } from './api/room/room.module'
import { MessageModule } from './api/message/message.module'
import { ChatModule } from './api/chat/chat.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development.local',
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: CONFIGURATION.RATE_LIMITING.TTL,
          limit: CONFIGURATION.RATE_LIMITING.LIMIT,
        },
      ],
    }),
    DBModule,
    UserModule,
    RoomModule,
    MessageModule,
    ChatModule,
  ],
})
export class AppModule {}
