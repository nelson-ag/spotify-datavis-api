const express = require('express');
const router = express.Router();
const { searchArtist, searchAlbum, getArtistById } = require('../controllers/spotifyController');

router.get('/artists', searchArtist);
router.get('/albums', searchAlbum);
router.get('/artists/:id', getArtistById);

module.exports = router; 