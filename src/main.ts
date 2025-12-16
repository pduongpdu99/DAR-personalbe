import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import helmet from 'helmet'
// import { KafkaOptions, Transport } from '@nestjs/microservices'
import { config } from 'dotenv'

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
config({
  path: '.env.development.local',
})

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // await NestFactory.createMicroservice<KafkaOptions>(AppModule, {
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       brokers: [process.env.AMQP_URL ?? 'localhost:9092'],
  //     },
  //   },
  // })

  app.enableCors()
  app.use(helmet())

  app.setGlobalPrefix('apis')

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
