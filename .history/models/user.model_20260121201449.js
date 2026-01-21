const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
        unique: true
    },
    email:{
        type: String,
        required: true
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userRole: {
        type: String,
        required: true,
        default:"CUSTOMER"
    },
    userStatus: {
        type: String,
        required: true,
        default: "Approved"
    }
},{ timestamps: true});

const User = mongoose.model('User',userSchema);
module.exports = User;