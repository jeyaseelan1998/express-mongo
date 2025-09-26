const express = require("express");
const cors = require("cors");

const { PORT, API_URL } = require("./helper/envConfig");
const connectDatabase = require("./db");

// v1 controllers
const healthCheckRouter = require("./routers/v1/HealthCheckRoute");
const authenticationRouter = require("./routers/v1/AuthenticationRoute");

// express app
const app = express();
app.use(express.json());
app.use(cors({
    origin: ["*"]
}));

// v1 Routers
app.use("/v1/health-check", healthCheckRouter);
app.use("/v1/page", authenticationRouter);

async function initializeServer() {
    try {
        await connectDatabase();
        app.listen(PORT, () => console.log(`\n>> Server is listening on ${API_URL}\n`));
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

initializeServer();