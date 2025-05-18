const { createClient } = require('redis');
const config = require('../config');

const redisClient = createClient({ url: config.redis.url });

redisClient.on('error', (err) => console.error('Redis error:', err));

module.exports = redisClient; 