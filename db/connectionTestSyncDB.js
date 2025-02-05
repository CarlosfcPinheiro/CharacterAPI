// Importing local packages
const {syncAllDBModels, sequelize} = require('./db.js');

// Test Connection and Sync database models
const connectionTestSyncDB = async () => {
    await sequelize.authenticate();
    await syncAllDBModels();
    console.log('Database connection successfully!');
}

// Exporting function
module.exports = connectionTestSyncDB;