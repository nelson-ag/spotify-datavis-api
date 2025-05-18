const express = require('express');
const cors = require('cors');
const config = require('./src/config');
const redisClient = require('./src/services/redisService');
const spotifyRoutes = require('./src/routes/spotifyRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors(config.cors));

// Routes
app.use('/api/v1', spotifyRoutes);

// Initialize Redis connection and start server
(async () => {
  try {
    await redisClient.connect();
    app.listen(config.port, () => console.log(`Server running on port ${config.port}`));
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();
