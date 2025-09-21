const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
    role: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    permission: [String],
    updatedAt: {
        type: Number,
        default: Date.now
    },
    createdAt: {
        type: Number,
        default: Date.now
    },
});

module.exports = mongoose.model("Role", RoleSchema);