const express = require('express');

// Controllers
const UserController = require('../controllers/user');
const { tokenValidate } = require('../middlewares/tokenValidate');

const router = express.Router();

// POST
router.post('/signup', UserController.postSignupUser);
router.post('/login', UserController.postLoginUser);
router.post('/logout',tokenValidate , UserController.postLogout);
router.post('/new-transaction', tokenValidate, UserController.postCreateTransaction);
// GET
router.get('/transaction', UserController.getUserTransaction);


module.exports = router;