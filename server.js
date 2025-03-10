// Importing packages
const morgan = require('morgan');
const express = require('express');
require('dotenv').config();

// Import association
require('./models/associations.js');

// Import cors config
const corsConfig = require('./utils/cors.js');

// Import Router
const userRouter = require('./routes/user.js');
const charRouter = require('./routes/char.js');
const authRouter = require('./routes/auth.js');

// Database test connection
const connectionTestSyncDB = require('./db/connectionTestSyncDB.js');

// Config server
const server = express();
const port = 3000 || process.env.PORT;
const std_endpoint = '/api/v1'

// Applying middlewares
server.options('*', corsConfig);
server.use(express.json());
// Route middlewares
server.use(`${std_endpoint}/user`, userRouter);
server.use(`${std_endpoint}/char`, charRouter);
server.use(`${std_endpoint}`, authRouter);
// server.use(morgan('tiny'));
server.use(morgan('dev'));

server.get('/', (req, res) => {
    res.send('<h1>Welcome to charAPI!</h1>');
    res.end();
});

const mainStart = async () => {
    try{
        await connectionTestSyncDB();
        server.listen(port, () => {
            console.log(`🟢 Start application successfully. Listening on port ${port}...`);
        });
    } catch(err){
        console.log(`⚠️ Error to start application: ${err.message}`);
        process.exit(1);
    }
}

// Start main function
mainStart();

// Importing express server instance
module.exports = server;