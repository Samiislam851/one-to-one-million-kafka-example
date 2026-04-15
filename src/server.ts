import app from './app/app';
import { env } from './config/env';
import { ensureDatabaseConnection, initializeDatabase, pool } from './db/postgres';

const startServer = async (): Promise<void> => {
  try {
    await ensureDatabaseConnection();
    await initializeDatabase();

    app.listen(env.PORT, () => {
      // Keep startup log concise for container logs.
      console.log(`Server running on http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
};

process.on('SIGINT', () => {
  void (async () => {
    await pool.end();
    process.exit(0);
  })();
});

void startServer();
