import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envValidationSchema } from './config/env.validation.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { buildTypeOrmConfig } from './config/database.config.js';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:['../backend/.env', '.env'],
      validationSchema: envValidationSchema
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService)=> buildTypeOrmConfig(configService)
    }),

    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
