const User = require('../models/user.model');
const {} = require('../utils/')
const createUser = async (data) => {
    try {
        // ---------------------------
        // Business Rules Validation
        // ---------------------------

        const userRole = data.userRole || 'CUSTOMER';

        let userStatus = data.userStatus || 'Approved';

        // CUSTOMER cannot set custom status
        if (userRole === 'CUSTOMER' && data.userStatus && data.userStatus !== 'Approved') {
            const err = new Error('Customer cannot set custom user status');
            err.statusCode = 400;
            throw err;
        }

        // Non-customer users are always Pending
        if (userRole !== 'CUSTOMER') {
            userStatus = 'Pending';
        }

        // ---------------------------
        // Create User
        // ---------------------------
        const user = await User.create({
            name: data.name,
            email: data.email,
            password: data.password,
            userRole,
            userStatus
        });

        // ---------------------------
        // Remove password from response
        // ---------------------------
        const userObj = user.toObject();
        delete userObj.password;

        return userObj;

    } catch (error) {
        // ---------------------------
        // Mongoose validation errors
        // ---------------------------
        if (error.name === 'ValidationError') {
            const validationErrors = {};
            Object.keys(error.errors).forEach((key) => {
                validationErrors[key] = error.errors[key].message;
            });

            const err = new Error('Validation failed');
            err.statusCode = 422;
            err.details = validationErrors;
            throw err;
        }

        // ---------------------------
        // Duplicate email
        // ---------------------------
        if (error.code === 11000) {
            const err = new Error('Email already exists');
            err.statusCode = 409;
            throw err;
        }

        // ---------------------------
        // Forward known errors
        // ---------------------------
        throw error;
    }
};

module.exports = {
    createUser
};
