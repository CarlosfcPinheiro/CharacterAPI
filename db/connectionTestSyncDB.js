// Importing local packages
const {syncAllDBModels, sequelize} = require('./db.js');

// Test Connection and Sync database models
const connectionTestSyncDB = async () => {
    await sequelize.authenticate();
    console.log('Database connection successfully!')
    // await syncAllDBModels();
}

// Exporting function
module.exports = connectionTestSyncDB;