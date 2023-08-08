import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import configuration from './config/configuration'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('monitor')
  app.enableCors({
    origin: ['http://localhost:10087'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Origin,Accept,Content-Type,Authorization',
    credentials: true
  })
  await app.listen(configuration().port)
}
bootstrap().finally(() => {})
