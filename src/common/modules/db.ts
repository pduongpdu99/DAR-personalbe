import { CONFIGURATION } from '@common/const'
import { User } from '@entities/user.entity'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        autoLoadEntities: true,
        host: config.get('MYSQL_HOSTNAME', CONFIGURATION.DATABASE.MYSQL?.HOST),
        port: config.get('MYSQL_PORT')
          ? Number(config.get('MYSQL_PORT'))
          : CONFIGURATION.DATABASE.MYSQL?.PORT,
        username: config.get(
          'MYSQL_USERNAME',
          CONFIGURATION.DATABASE.MYSQL?.USERNAME,
        ),
        password: config.get(
          'MYSQL_PASSWORD',
          CONFIGURATION.DATABASE.MYSQL?.PASSWORD,
        ),
        database: config.get(
          'MYSQL_DATABASE',
          CONFIGURATION.DATABASE.MYSQL?.DATABASE,
        ),
        entities: [User],
        // logging: true,
        synchronize: true,
      }),
    }),
  ],
})
export class DBModule {}
