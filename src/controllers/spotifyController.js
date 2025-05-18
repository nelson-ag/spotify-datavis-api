const SpotifyService = require('../services/spotifyService');
const { standardizeResponse, handleError } = require('../utils/response');

const searchArtist = async (req, res) => {
  const { name: artistName } = req.query;

  if (!artistName) {
    return res.status(400).json(standardizeResponse(null, 'Artist name is required'));
  }

  try {
    const data = await SpotifyService.searchArtist(artistName);

    if (!data.artists?.items.length) {
      return res.status(404).json(standardizeResponse(null, 'Artist not found.'));
    }

    const artist = data.artists.items[0];
    return res.json(standardizeResponse({
      name: artist.name,
      followers: artist.followers.total,
      spotifyProfile: artist.external_urls.spotify,
      imageUrl: artist.images.length > 0 ? artist.images[0].url : null
    }));
  } catch (error) {
    handleError(res, error, 'Failed to fetch artist Spotify information');
  }
};

const searchAlbum = async (req, res) => {
  const { title: albumTitle } = req.query;

  if (!albumTitle) {
    return res.status(400).json(standardizeResponse(null, 'Album name is required'));
  }

  try {
    const data = await SpotifyService.searchAlbum(albumTitle);

    if (!data.albums?.items.length) {
      return res.status(404).json(standardizeResponse(null, 'Album not found.'));
    }

    const album = data.albums.items[0];
    return res.json(standardizeResponse({
      name: album.name,
      artist: album.artists[0].name,
      artistId: album.artists[0].id,
      spotifyProfile: album.external_urls.spotify,
      imageUrl: album.images.length > 0 ? album.images[0].url : null
    }));
  } catch (error) {
    handleError(res, error, 'Failed to fetch album Spotify information');
  }
};

const getArtistById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json(standardizeResponse(null, 'Artist Id is required'));
  }

  try {
    const artist = await SpotifyService.getArtistById(id);

    if (!artist) {
      return res.status(404).json(standardizeResponse(null, 'Artist not found.'));
    }

    return res.json(standardizeResponse({
      name: artist.name,
      followers: artist.followers.total,
      spotifyProfile: artist.external_urls.spotify,
      imageUrl: artist.images.length > 0 ? artist.images[0].url : null
    }));
  } catch (error) {
    handleError(res, error, 'Failed to fetch artist Spotify information');
  }
};

module.exports = {
  searchArtist,
  searchAlbum,
  getArtistById
}; 