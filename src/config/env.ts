import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['DATABASE_URL'] as const;

for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const parsePort = (value: string | undefined): number => {
  const fallbackPort = 5000;
  if (!value) {
    return fallbackPort;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error('PORT must be a positive integer');
  }

  return parsed;
};

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: parsePort(process.env.PORT),
  DATABASE_URL: process.env.DATABASE_URL as string,
};
