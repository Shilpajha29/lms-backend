import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { Logger, ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Booststrap');
  //security middleware - Secures http headers
  app.use(helmet());

  app.use(cors({
    origin:[process.env.FRONTEND_URL || 'http://localhost:3001/'],
    credentials: true
  }));

  //Logger middleware
  app.use(morgan('combined'));

  //Global Validation Pipe - request body 
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist:true,
      forbidNonWhitelisted:true,
    })
  )

  app.setGlobalPrefix('api');
  const port = process.env.PORT ?? 8000;
  await app.listen(port);
  logger.log(`Server listening on http://localhost:${port}/api`);
}
await bootstrap();
