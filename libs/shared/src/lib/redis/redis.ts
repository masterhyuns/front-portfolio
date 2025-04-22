import Redis from 'ioredis';

export const redisConnect = new Redis({
  host: 'localhost',
  port: 6379,
});
