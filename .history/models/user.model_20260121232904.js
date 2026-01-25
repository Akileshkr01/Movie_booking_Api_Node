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

/**
 * Pre-save hook to hash password
 */
userSchema.pre('save', async function (next) {
    // Only hash password if it is new or modified
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('User', userSchema);
