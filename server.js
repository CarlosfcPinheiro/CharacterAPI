// Importing packages
const morgan = require('morgan');
const express = require('express');
require('dotenv').config();

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
        server.listen(port, () => {
            console.log(`Listening server on port ${port}...`);
        });
    } catch(err){
        console.log(err);
    }
}

// Start main function
mainStart();