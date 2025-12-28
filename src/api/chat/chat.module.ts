import { Module } from '@nestjs/common'
import { ChatController } from './chat.controller'
import { ChatService } from './chat.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Chat } from '@entities/chat.entity'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { AMQP_QUEUE, AMQP_SERVICES } from '@common/const'

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat]),
    ClientsModule.registerAsync({
      clients: [
        {
          name: AMQP_SERVICES.CHAT,
          imports: [ConfigModule],
          useFactory: (config: ConfigService) => {
            return {
              transport: Transport.RMQ,
              options: {
                protocol: 'amqp',
                queue: AMQP_QUEUE.CHAT,
                urls: [config.getOrThrow<string>('AMQP_URL')],
                queueOptions: {
                  durable: false,
                },
                // servers: [
                //   {
                //     host: config.getOrThrow<string>('MQTT_HOSTNAME'),
                //     port: config.getOrThrow<number>('MQTT_PORT'),
                //   },
                // ],
                // username: config.getOrThrow<string>('MQTT_USERNAME'),
                // password: config.getOrThrow<string>('MQTT_PASSWORD'),
              },
            }
          },
          inject: [ConfigService],
        },
      ],
      isGlobal: true,
    }),
  ],
  controllers: [ChatController],
  providers: [ConfigService, ChatService],
})
export class ChatModule {}
