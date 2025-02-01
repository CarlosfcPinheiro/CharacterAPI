// Get bycriptjs package
const bcrypt = require('bcryptjs');

// Generate hash
const hashPassword = async(password) => {
    const saltR = 5;
    const hashedPassword = await bcrypt.hash(password, saltR);
    
    return hashedPassword;
}

// Verify password
const verifyPassword = async(password, hashedPassword) => {
    const verify = bcrypt.compare(password, hashedPassword);
    return verify;
}

// Exporting hash utils
module.exports = {hashPassword, verifyPassword};