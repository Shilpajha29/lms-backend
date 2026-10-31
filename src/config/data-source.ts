import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';

// dotenv = .env file se variables load karta hai (DB_HOST, JWT_SECRET, etc.)
// Migration/CLI commands ke liye zaroori - NestJS app start hone se pehle env load ho jaye
dotenv.config({ path: join(__dirname, '../../.env') });

// SSL = Secure Sockets Layer - database connection encrypted hoti hai (HTTPS jaisa, lekin DB ke liye)
// Cloud DB (Railway, Supabase, AWS RDS) use karte ho to usually SSL ON chahiye
const sslEnabled = process.env.DB_SSL === 'true';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'shilpajha',
  password: process.env.DB_PASSWORD || 'shilpajha',
  database: process.env.DB_NAME || 'lms_development',
  entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
  // synchronize: false = TypeORM auto table create/alter NAHI karega. Migrations use karo - production safe.
  synchronize: false,
  // rejectUnauthorized: false = self-signed certs allow (development). Production me true ya proper cert use karo.
  ssl: sslEnabled ? { rejectUnauthorized: false } : false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
