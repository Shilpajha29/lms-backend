
import dotenv from 'dotenv';
import pg from 'pg';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.join(__dirname, '../.env'),
});

const { Client } = pg;

const host = process.env.DB_HOST || 'localhost';
const port = parseInt(process.env.DB_PORT || '5432', 10);
const user = process.env.DB_USERNAME || 'shilpajha';
const password = process.env.DB_PASSWORD || '';
const dbName = process.env.DB_NAME || 'lms_development';

async function createDb() {
  const client = new Client({
    host,
    port,
    user,
    password,
    database: 'postgres',
  });

  try {
    await client.connect();

    const res = await client.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [dbName],
    );

    // FIX: PostgreSQL returns rowCount, not row.length
    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Database '${dbName}' created successfully`);
    } else {
      console.log(`Database '${dbName}' already exists`);
    }
  } catch (error) {
    console.error(
      'Database creation error:',
      error instanceof Error ? error.message : String(error),
    );
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

createDb();
