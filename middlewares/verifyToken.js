// Importing jsonwebtoken package
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Verify token middleware
const verifyToken = (req, res, next) => {
    // Get Token from header
    const token = req.header('Authorization');
    if (!token){
        return res.status(401).json({
            message: 'Access denied. Token was not provided.'
        })
    }
    // Verify Token
    try{
        const verified = jwt.verify(token.replace("Bearer ", ""), process.env.SECRET_KEY);
        req.user = verified;
        next();
    } catch(err){
        return res.status(401).json({
            message: 'Invalid Token.'
        })
    }
}

// Export middleware
module.exports = verifyToken;