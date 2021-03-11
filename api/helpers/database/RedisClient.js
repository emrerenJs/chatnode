const redis = require('redis');
const getClient = () => {
    redisClientOptions = {
        host: process.env.REDIS_URI,
        port: process.env.REDIS_PORT
    }
    return redis.createClient(redisClientOptions)
}
module.exports = {getClient}