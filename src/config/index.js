require('dotenv').config();

const config = {
  port: process.env.PORT || 4000,
  spotify: {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    baseUrl: 'https://api.spotify.com/v1',
    authUrl: 'https://accounts.spotify.com/api/token'
  },
  redis: {
    url: process.env.REDIS_URL
  },
  cors: {
    origin: process.env.CORS_ORIGIN
  }
};

module.exports = config; 