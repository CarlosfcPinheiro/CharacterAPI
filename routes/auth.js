// Importing usefull packages
const express = require('express');
// Instance Router class
const router = express.Router();

const {
    loginUser,
    verifyTokenUser,
    logoutUser} = require('../controllers/auth.js');

router.post('/login', loginUser);

router.get('/verify', verifyTokenUser);
router.get('/logout', logoutUser);

// Exporting auth router
module.exports = router;