import { Pool, QueryResult, QueryResultRow } from 'pg';
import { env } from '../config/env';

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

export const query = <T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[],
): Promise<QueryResult<T>> => pool.query<T>(text, params);

const isMissingDatabaseError = (error: unknown): boolean => {
  if (!error || typeof error !== 'object') {
    return false;
  }

  return 'code' in error && (error as { code?: string }).code === '3D000';
};

const quoteIdentifier = (identifier: string): string => {
  return `"${identifier.replace(/"/g, '""')}"`;
};

const createDatabaseIfMissing = async (): Promise<void> => {
  const url = new URL(env.DATABASE_URL);
  const databaseName = url.pathname.replace('/', '');

  if (!databaseName) {
    throw new Error('DATABASE_URL must include a database name');
  }

  // Connect to a maintenance DB so we can create the target DB.
  url.pathname = '/postgres';
  const adminPool = new Pool({ connectionString: url.toString() });

  try {
    const existsResult = await adminPool.query<{ exists: boolean }>(
      'SELECT EXISTS(SELECT 1 FROM pg_database WHERE datname = $1) AS exists',
      [databaseName],
    );

    if (!existsResult.rows[0]?.exists) {
      await adminPool.query(`CREATE DATABASE ${quoteIdentifier(databaseName)}`);
      console.log(`Created missing database: ${databaseName}`);
    }
  } finally {
    await adminPool.end();
  }
};

export const ensureDatabaseConnection = async (): Promise<void> => {
  try {
    await query('SELECT 1');
  } catch (error) {
    if (!isMissingDatabaseError(error)) {
      throw error;
    }

    await createDatabaseIfMissing();
    await query('SELECT 1');
  }
};

export const initializeDatabase = async (): Promise<void> => {
  await query(`
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      type TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
  await query(`
    CREATE TABLE IF NOT EXISTS counts (
      id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
      type TEXT NOT NULL UNIQUE,
      count BIGINT NOT NULL DEFAULT 0
    )
  `);
//insert only if click type is not already present in the database
  await query(`
    INSERT INTO counts (id, type, count)
    VALUES (1, 'click', 0) ON CONFLICT (type) DO NOTHING
  `);
};
