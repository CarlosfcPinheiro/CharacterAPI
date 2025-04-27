// Importing local packages
const {syncAllDBModels, sequelize} = require('./db.js');

// Test Connection and Sync database models
const connectionTestSyncDB = async () => {
    try{
        await sequelize.authenticate();
        await syncAllDBModels();
        console.log('🟢 Database connection successfully!');
        
        return true
    } catch(err){
        console.log(`⚠️ Database connection error: ${err.message}`);
        process.exit(1);
    }
}

// Exporting function
module.exports = connectionTestSyncDB;