const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match : [ ,]
    },
    password: {
        type: String,
        required: true,
        minLength:10
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