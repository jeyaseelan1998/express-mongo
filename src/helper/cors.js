const { ALLOWED_ORIGINS } = require("./envConfig");

// const whitelist = (ALLOWED_ORIGINS || "").split(",");

const corsOptions = {
    // origin: function (origin, callback) {
    //     if (whitelist.indexOf(origin) !== -1) {
    //         callback(null, true);
    //     } else {
    //         callback(new Error('Not allowed by CORS, whitelist using ALLOWED_ORIGINS variable'));
    //     }
    // },
    methods: "GET,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
}

module.exports = corsOptions;