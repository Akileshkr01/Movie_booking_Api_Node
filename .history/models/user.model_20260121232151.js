const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Please provide a valid email'
        ]
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    userRole: {
        type: String,
        enum: ['CUSTOMER', 'ADMIN'],
        default: 'CUSTOMER'
    },
    userStatus: {
        type: String,
        enum: ['Approved', 'Pending', 'Blocked'],
        default: 'Approved'
    }
}, { timestamps: true });

userSchema.pre('save', async function (next)  {
    // a trigger to encrypt the plain password 
})

module.exports = mongoose.model('User', userSchema);
