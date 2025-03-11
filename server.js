// Importing packages
const morgan = require('morgan');
const express = require('express');
require('dotenv').config();

// Swagger imports
const swaggerUi = require('swagger-ui-express');
const swaggerConfig = require('./utils/swaggerConfig.js');

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
server.use(`${std_endpoint}/users`, userRouter);
server.use(`${std_endpoint}/chars`, charRouter);
server.use(`${std_endpoint}`, authRouter);
// server.use(morgan('tiny'));
server.use(morgan('dev'));
// documentation
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

server.get('/', (req, res) => {
    res.send(`<h1>Welcome to Charpi API!</h1>
        <p>Access the docs in <strong>/docs</strong></p>`)
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