import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from '@common/modules/db'
import { ThrottlerModule } from '@nestjs/throttler'
import { UserModule } from './api/user/user.module'
import { CONFIGURATION } from '@common/const'

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
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
    UserModule,
  ],
})
export class AppModule {}
