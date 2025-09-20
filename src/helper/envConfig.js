
// Check for .env file
if (require("fs").existsSync(".env")) {
    require("dotenv").config({ path: ".env" });
} else {
    throw new Error("Include .env File !!!");
}

module.exports = {
    PORT: process.env.PORT,
    API_URL: process.env.API_URL,
    CONNECTION_STRING: process.env.CONNECTION_STRING,
    DB_NAME: process.env.DB_NAME,
};