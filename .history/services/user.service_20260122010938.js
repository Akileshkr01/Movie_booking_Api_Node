const User = require('../models/user.model');
const { USER_ROLE, USER_STATUS } = require('../utils/constants');

const createUser = async (data) => {
    try {
        // ---------------------------
        // Normalize & validate role
        // ---------------------------
        const userRole = data.userRole || USER_ROLE.CUSTOMER;

        if (!Object.values(USER_ROLE).includes(userRole)) {
            const err = new Error(
                `Invalid user role. Allowed values are: ${Object.values(USER_ROLE).join(', ')}`
            );
            err.statusCode = 422;
            throw err;
        }

        let userStatus = data.userStatus || USER_STATUS.APPROVED;

        // ---------------------------
        // Business rules
        // ---------------------------
        if (
            userRole === USER_ROLE.CUSTOMER &&
            data.userStatus &&
            data.userStatus !== USER_STATUS.APPROVED
        ) {
            const err = new Error('Customer cannot set custom user status');
            err.statusCode = 400;
            throw err;
        }

        if (userRole !== USER_ROLE.CUSTOMER) {
            userStatus = USER_STATUS.PENDING;
        }

        // ---------------------------
        // Create user
        // ---------------------------
        const user = await User.create({
            name: data.name,
            email: data.email,
            password: data.password,
            userRole,
            userStatus
        });

        const userObj = user.toObject();
        delete userObj.password;

        return userObj;

    } catch (error) {
        // Mongoose validation errors
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

        // Duplicate email
        if (error.code === 11000) {
            const err = new Error('Email already exists');
            err.statusCode = 409;
            throw err;
        }

        throw error;
    }
};

module.exports = {
    createUser
};
