// Importing packages
const {Sequelize} = require('sequelize');
require('dotenv').config({path: '../.env'});

// Getting enviroment variables
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const db_name = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// Creating Sequelize instance
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: host,
    username: username,
    password: password,
    port: port,
    database: db_name,

    define: {
        schema: 'charapi'
    },
});

// Testing DB connection
const testDBConnection = async () => {
    try{
        await sequelize.authenticate();
        console.log("Test Database connection successfuly.");
    } catch (e){
        console.log("Connect Database Error: \n" + e);
    }
}

testDBConnection();

// Exporting sequelize instance
module.exports = {sequelize, testDBConnection};