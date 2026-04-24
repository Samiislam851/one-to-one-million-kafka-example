import { createClient } from 'redis';
import { env } from '../config/env';

export const redisClient = createClient({
  url: env.REDIS_URL,
});

redisClient.on('error', (error) => {
  console.error('Redis client error', error);
});

export const ensureRedisConnection = async (): Promise<void> => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log('Redis connected successfully');
  } else {
    console.log('Redis already connected');
  }
};
