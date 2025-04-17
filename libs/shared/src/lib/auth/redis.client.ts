import { createClient, RedisClientType } from 'redis';
import Redis from 'ioredis';
let redis: RedisClientType;

export async function getRedis() {
  if (!redis) {
    redis = createClient({ url: 'http://localhost:6379' });
    await redis.connect();
  }
  return redis;
}

export const redisConnect = () =>
  new Redis({
    host: 'localhost',
    port: 6379,
  });
