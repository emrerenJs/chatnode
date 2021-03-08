const redis = require('redis');
const expressSession = require('express-session');
const RedisStore = require('connect-redis')(expressSession);

const redisClient = redis.createClient({
    host:process.env.REDIS_URI,
    port:process.env.REDIS_PORT,
    password:process.env.REDIS_PASSWORD
});

module.exports = new RedisStore({client: redisClient});