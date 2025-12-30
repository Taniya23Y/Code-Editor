require("dotenv").config();
const Redis = require("ioredis");

const redis = new Redis(process.env.REDIS_URL);

redis.on("connect", () => {
  console.log('"Redis Connected!"');
});

redis.on("error", (error) => {
  console.log('"Redis Error:', error);
});

module.exports = redis;
