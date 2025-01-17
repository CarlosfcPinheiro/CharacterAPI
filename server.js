// Importing packages
const morgan = require('morgan');
const express = require('express');
require('dotenv').config();

// Database test connection
const connectionTestSyncDB = require('./db/connectionTestSyncDB.js');

// Config server
const server = express();
const port = 3000 || process.env.PORT;

// Applying middlewares
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
            console.log(`Listening server on port ${port}...`);
        });
    } catch(err){
        console.log(err);
    }
}

// Start main function
mainStart();