import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { UserModule } from './api/user/user.module'
import { CONFIGURATION } from '@common/const'
import { DBModule } from '@common/modules/db'

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
  ],
})
export class AppModule {}
