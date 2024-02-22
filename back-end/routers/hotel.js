const express = require('express');

// Controllers
const HotelController = require('../controllers/hotel');

const router = express.Router();

// GET
router.get('/city', HotelController.getHotelsByCity);
router.get('/type', HotelController.getPropertyType);
router.get('/top-rate', HotelController.getTopRate);
router.get('/detail/:id', HotelController.getHotelDetail);
// POST
router.post('/search', HotelController.postSearchHotels);
router.post('/search-rooms', HotelController.postSearchRemainRooms);

module.exports = router;