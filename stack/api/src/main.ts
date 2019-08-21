import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const { PORT } = process.env;

async function bootstrap() {
  console.log(`Starting api on PORT:${PORT}`);
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
