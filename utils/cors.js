// Importing cors package
const cors = require('cors');
// Cors config
const corsConfig = cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
});
// Exporting cors instance
module.exports = corsConfig;