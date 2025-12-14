import CONFIGURATION from '@common/const'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          host: config.get(
            'MYSQL_HOSTNAME',
            CONFIGURATION.DATABASE.MYSQL?.HOST,
          ),
          port: config.get('MYSQL_PORT', CONFIGURATION.DATABASE.MYSQL?.PORT),
          username: config.get(
            'MYSQL_USERNAME',
            CONFIGURATION.DATABASE.MYSQL?.USERNAME,
          ),
          password: config.get(
            'MYSQL_PASSWORD',
            CONFIGURATION.DATABASE.MYSQL?.PASSWORD,
          ),
        }
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
