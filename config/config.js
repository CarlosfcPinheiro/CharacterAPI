// DB Config file to SEQUELIZE-CLI
require('dotenv').config();
const config = {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "port": process.env.DB_PORT,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT,
    "logging": true,
}
// Exporting configs to all states
module.exports = {
    development: config,
    test: config,
    production: config
}