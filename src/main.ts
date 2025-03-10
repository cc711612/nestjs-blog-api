// filepath: /Users/roy/project/blog-api/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ? process.env.PORT : 3000;
  await app.listen(port);
}
bootstrap();