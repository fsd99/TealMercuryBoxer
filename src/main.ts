import { NestFactory } from '@nestjs/core'
import { AppModule } from './plentina.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'warn', 'error']
  });
  await app.listen(3000);
}
bootstrap();
