const mongoose = require('mongoose');

/**
 * Defines the schema of theatre resource to be stored in the db
 */
const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength:5
    },
    description: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    address: {
        type: String
    }
}, { timestamps: true });


const Theatre = mongoose.model('Theatre', theatreSchema);


module.exports = Theatre; 