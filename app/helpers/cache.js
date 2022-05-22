/**
 * Module that uses Redis for caching
 */

const debug = require('debug')('CacheModule');
const { createClient } = require('redis');

// setting up the Redis client
const db = createClient();

const TTL = 60 * 30;
const PREFIX = 'oblog:';

// storage of the different keys inserted in redis
const keys = [];

const cacheModule = {
    /**
     * method to connect redis client
     */
    async connect() {
        await db.connect();
    },
    /**
     * middleware that caches data and calls the following middleware
     */
    async cache(req, res, next) {
        const key = `${PREFIX}${req.url}`;

        if (keys.includes(key)) {
            debug('Data via Redis');
            // retrieve data
            const cachedString = await db.get(key);
            // convert data
            const cachedValue = JSON.parse(cachedString);
            // send data
            return res.json(cachedValue);
        }

        // to cache the before retrieving it, we can manipulate res.json
        // we save the original code of res.json
        const originalJson = res.json.bind(res);

        // we redefine res.json to include data caching before calling the original method
        res.json = async (data) => {
            debug('Caching with custom Json Response');
            const jsonData = JSON.stringify(data);
            await db.setEx(key, TTL, jsonData);
            keys.push(key);
            originalJson(data);
        };

        return next();
    },
    /**
     * middleware to flush the cache
     */
    async flush(req, res, next) {
        debug('Flush the cache');

        const promises = [];
        keys.forEach((key) => promises.push(db.del(key)));
        await Promise.all(promises);

        keys.length = 0;

        next();
    },
};

module.exports = cacheModule;
