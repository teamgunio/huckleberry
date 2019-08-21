import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const {
  npm_package_version:version,
  PORT,
} = process.env;

async function bootstrap() {
  console.log(`Starting api v${version} on PORT: ${PORT}`);
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(PORT);
}
bootstrap();
