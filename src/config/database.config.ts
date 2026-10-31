import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

/**
 * NestJS app ke liye TypeORM config - ConfigService se env values leta hai.
 * getOrThrow = agar missing ho to app start nahi hoga (fail fast, safe).
 */
export const buildTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  // SSL - cloud DB par encrypted connection. Local me usually false.
  const sslEnabled = configService.get<boolean>('DB_SSL', false);

  return {
    type: 'postgres',
    host: configService.getOrThrow<string>('DB_HOST'),
    port: configService.getOrThrow<number>('DB_PORT'),
    username: configService.getOrThrow<string>('DB_USERNAME'),
    password: configService.getOrThrow<string>('DB_PASSWORD'),
    database: configService.getOrThrow<string>('DB_NAME'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false, // Migrations use karo, auto-sync production me dangerous
    logging: false,
    ssl: sslEnabled ? { rejectUnauthorized: false } : false,
  };
};
