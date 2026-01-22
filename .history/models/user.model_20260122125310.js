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
        minlength: [6, 'Password must be at least 6 characters long']
    },
    userRole: {
        type: String,
        enum: {
            values: Object.values(USER_ROLE),
            message: 'Invalid user role'
        },
        default: USER_ROLE.CUSTOMER
    },
    userStatus: {
        type: String,
        enum: {
            values: Object.values(USER_STATUS),
            message: 'Invalid user status'
        },
        default: USER_STATUS.APPROVED
    }
}, { timestamps: true });

/**
 * Hash password before save
 */
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isValidPassword = async (plainPassword) => {
    const currentUser = this;
    const compare = await bcrypt.compare(plain)
}

module.exports = mongoose.model('User', userSchema);
