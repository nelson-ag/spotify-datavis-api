const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const config = require('../config');
const redisClient = require('./redisService');

class SpotifyService {
  static async getAccessToken() {
    try {
      const cachedToken = await redisClient.get('spotify_access_token');
      if (cachedToken) {
        console.log('Access token served from Redis cache.');
        return cachedToken;
      }

      const response = await fetch(config.spotify.authUrl, {
        method: 'POST',
        headers: {
          Authorization: 'Basic ' + Buffer.from(`${config.spotify.clientId}:${config.spotify.clientSecret}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
      });

      const data = await response.json();

      if (!data.access_token) {
        throw new Error('Failed to retrieve Spotify token');
      }

      await redisClient.setEx('spotify_access_token', data.expires_in, data.access_token);
      console.log('New access token fetched and cached.');
      return data.access_token;
    } catch (error) {
      console.error('Error in getAccessToken:', error);
      throw error;
    }
  }

  static async searchArtist(name) {
    const token = await this.getAccessToken();
    const response = await fetch(
      `${config.spotify.baseUrl}/search?q=artist:${encodeURIComponent(name)}&type=artist&limit=1`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.json();
  }

  static async searchAlbum(title) {
    const token = await this.getAccessToken();
    const response = await fetch(
      `${config.spotify.baseUrl}/search?q=album:${encodeURIComponent(title)}&type=album&limit=1`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.json();
  }

  static async getArtistById(id) {
    const token = await this.getAccessToken();
    const response = await fetch(
      `${config.spotify.baseUrl}/artists/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.json();
  }
}

module.exports = SpotifyService; 