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
});

// Synchronizing all models from DB
const syncAllDBModels = async () => {
    try{
        await sequelize.sync({ alter:true });
        console.log("All models were sync successfully!");
    } catch(err){
        console.log("Error during models sync.");
    }
}

// Exporting sequelize instance
module.exports = {sequelize, syncAllDBModels};