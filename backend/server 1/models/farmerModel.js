const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    gender: {
        type: String,
        enum:['male', 'female', 'other'],
    },
    dateOfBirth: {
        type: Date,
    },
    mobile: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const Farmers = mongoose.model('farmers', farmerSchema);
module.exports = Farmers;