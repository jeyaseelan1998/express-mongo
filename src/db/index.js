const mongoose = require("mongoose");
const { CONNECTION_STRING, DB_NAME } = require("../helper/envConfig");

module.exports = async function connectDatabase() {
    try {
        await mongoose.connect(CONNECTION_STRING, {
            dbName: DB_NAME,
        });
        console.log("\n>> MongoDB connected successfully");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}