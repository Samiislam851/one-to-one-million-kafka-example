import app from './app/app';
import { env } from './config/env';
import { ensureDatabaseConnection, initializeDatabase, pool } from './db/postgres';
import { ensureRedisConnection, redisClient } from './db/redis';

const startServer = async (): Promise<void> => {
  try {
    await ensureDatabaseConnection();
    await initializeDatabase();
    await ensureRedisConnection();

    app.listen(env.PORT, () => {
      // Keep startup log concise for container logs.
      console.log(`Server running on http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
};

const shutdown = async (): Promise<void> => {
  await Promise.allSettled([pool.end(), redisClient.quit()]);
  process.exit(0);
};

process.on('SIGINT', () => {
  void shutdown();
});

process.on('SIGTERM', () => {
  void shutdown();
});

void startServer();
