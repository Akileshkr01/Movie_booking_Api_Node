const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { USER_ROLE, USER_STATUS } = require('../utils/constants');

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
        enum: Object.values(USER_ROLE),
        default: USER_ROLE.CUSTOMER
    },
    userStatus: {
        type: String,
        enum: Object.values(USER_STATUS),
        default: USER_STATUS.APPROVED
    }
}, { timestamps: true });

/**
 * Hash password before save
 */
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    try {
        this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
        throw error;
    }
});

module.exports = mongoose.model('User', userSchema);
