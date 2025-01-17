// Importing local packages
const {syncAllDBModels, sequelize} = require('./db.js');

// Test Connection and Sync database models
const connectionTestSyncDB = async () => {
    try{
        await sequelize.authenticate();
        console.log('Database connection successfully!')
        // await syncAllDBModels();
    } catch(e){
        console.log('Error during database connection test: ' + e);
    }
}

// Exporting function
module.exports = connectionTestSyncDB;