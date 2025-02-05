// Importing usefull packages
const express = require('express');
// Instance Router class
const router = express.Router();
// Importing middlewares
const verifyToken = require('../middlewares/verifyToken.js');

const {
    loginUser,
    verifyTokenUser,
    logoutUser} = require('../controllers/auth.js');

router.post('/login', loginUser);

router.get('/verify', verifyToken, verifyTokenUser);
router.get('/logout', logoutUser);

// Exporting auth router
module.exports = router;