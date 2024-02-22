const express = require('express');
const router = express.Router();

// Controllers
const AdminControllers = require('../controllers/admin');


// POST
router.post('/login', AdminControllers.postAdminLogin);
router.post('/logout', AdminControllers.postLogout);
router.post('/delete/hotel', AdminControllers.postDeleteHotel);
router.post('/delete/room', AdminControllers.postDeleteRoom);
router.post('/add/hotel', AdminControllers.postAddNewHotel);
router.post('/add/room', AdminControllers.postAddNewRoom);


// GET
router.get('/statistic', AdminControllers.getStatisticData);
router.get('/userslist', AdminControllers.getUsersList);
router.get('/hotelslist', AdminControllers.getHotelsList);
router.get('/roomslist', AdminControllers.getRoomsList);
router.get('/transactionslist', AdminControllers.getTransactionsList);
router.get('/hotelNameList', AdminControllers.getHotelsNameList);


module.exports = router;