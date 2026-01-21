const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {USER_ROLE,USER_STATUS} = require('../utils/constants')
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
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    userRole: {
        type: String,
        enum: [USER],
        default: 'CUSTOMER'
    },
    userStatus: {
        type: String,
        enum: ['Approved', 'Pending', 'Blocked'],
        default: 'Approved'
    }
}, { timestamps: true });

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('User', userSchema);
