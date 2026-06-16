const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
    name: String,
    registerNumber: String,
    department: String,
    category: String,
    problem: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Complaint", complaintSchema);