const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'ongoing', 'completed'],
        default: 'pending'
    },
}, {timestamps : true});

module.exports = mongoose.model("Task", taskSchema);