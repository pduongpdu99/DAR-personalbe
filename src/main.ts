import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import helmet from 'helmet'
import { config } from 'dotenv'
// import { MicroserviceOptions, Transport } from '@nestjs/microservices'

config({ path: '.env.development.local' })

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  if (!process.env.AMQP_URL) {
    throw new Error('AMQP_URL is missing')
  }

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [process.env.AMQP_URL],
  //     queue: 'chat_queue',
  //     queueOptions: {
  //       durable: false,
  //     },
  //   },
  // })

  app.enableCors()
  app.use(helmet())

  app.setGlobalPrefix('api/v1')

  // connect(process.env.AMQP_URL ?? '', {
  //   protocolVersion: 5,
  // })

  await app.startAllMicroservices()
  await app.listen(process.env.PORT ?? 3000)
}

void bootstrap()
