import IORedis, { Redis } from 'ioredis';
import Redlock from 'redlock';
import { serverConfig } from '.';

// export const redisClient = new IORedis(serverConfig.REDIS_SERVER_URL);

function connectToRedis() {
    try {
    let connection: Redis | null = null;

        return () => {
            if (!connection) {
                const connection = new IORedis(serverConfig.REDIS_SERVER_URL);
                return connection;
            }
            return connection;
        };

    } catch (error) {
        console.error('Error connecting to Redis:', error);
        throw error;
    }
}
export const getRedisConnObj = connectToRedis();

export const redLock = new Redlock([getRedisConnObj()], {
    driftFactor: 0.01, // time in ms
    retryCount: 10,
    retryDelay: 200, // time in ms
    retryJitter: 200 // time in ms
}); 