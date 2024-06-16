const express = require('express');
const router = express.Router();
const {
    RegisterUser,
    LoginUser,
    CurrentUser,
} = require('../controllers/usercontrollers');
const validateToken = require('../middleware/validateTokenHandle');

router.post('/register',RegisterUser);

router.post('/login', LoginUser);

router.get('/current', validateToken,CurrentUser);


module.exports = router;