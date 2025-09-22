const mongoose = require("mongoose");

const ErrorSchema = new mongoose.Schema({
    repository: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    stack: {
        type: String,
        required: true,
        trim: true
    },
    count: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Number,
        default: Date.now
    },
});

module.exports = mongoose.model("Error", ErrorSchema);