const redisHelper = require('../database/RedisClient');
const expressSession = require('express-session');
const RedisStore = require('connect-redis')(expressSession);

const redisClient = redisHelper.getClient();

module.exports = new RedisStore({client: redisClient});