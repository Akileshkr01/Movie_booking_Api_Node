const User = require('../models/user.model');
const { USER_ROLE, USER_STATUS, STATUS } = require('../utils/constants');

/**
 * Create a new user
 */
const createUser = async (data) => {
    try {
        // Determine user role
        const userRole = data.userRole || USER_ROLE.CUSTOMER;
        let userStatus = data.userStatus || USER_STATUS.APPROVED;

        // Validate customer status
        if (userRole === USER_ROLE.CUSTOMER && data.userStatus && data.userStatus !== USER_STATUS.APPROVED) {
            const err = new Error('Customer cannot set custom user status');
            err.statusCode = STATUS.BAD_REQUEST;
            throw err;
        }

        // Set pending status for non-customers
        if (userRole !== USER_ROLE.CUSTOMER) {
            userStatus = USER_STATUS.PENDING;
        }

        // Create user
        const user = await User.create({
            name: data.name,
            email: data.email,
            password: data.password,
            userRole,
            userStatus
        });

        // Return user without password
        const userObj = user.toObject();
        delete userObj.password;

        return userObj;

    } catch (error) {
        console.error('Create user error:', error);

        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            const validationErrors = {};
            Object.keys(error.errors).forEach(key => {
                validationErrors[key] = error.errors[key].message;
            });

            const err = new Error('Validation failed');
            err.statusCode = STATUS.UNPROCESSABLE_ENTITY;
            err.details = validationErrors;
            throw err;
        }

        // Handle duplicate email error
        if (error.code === 11000) {
            const err = new Error('Email already exists');
            err.statusCode = STATUS.CONFLICT;
            throw err;
        }

        // Re-throw custom errors with statusCode
        if (error.statusCode) {
            throw error;
        }

        // Generic server error
        const err = new Error('Failed to create user');
        err.statusCode = STATUS.INTERNAL_SERVER_ERROR;
        err.details = { original: error.message };
        throw err;
    }
};

/**
 * Get user by email
 */
const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            const err = new Error("No user found for the given email");
            err.statusCode = STATUS.NOT_FOUND;
            throw err;
        }

        return user;

    } catch (error) {
        // Re-throw custom errors
        if (error.statusCode) {
            throw error;
        }

        // Database error
        console.error('Get user by email error:', error);
        const err = new Error('Failed to fetch user');
        err.statusCode = STATUS.INTERNAL_SERVER_ERROR;
        throw err;
    }
};

/**
 * Get user by ID
 */
const getUserById = async (id) => {
    try {
        const user = await User.findById(id);

        if (!user) {
            const err = new Error("No user found for the given id");
            err.statusCode = STATUS.NOT_FOUND;
            throw err;
        }

        return user;

    } catch (error) {
        // Re-throw custom errors
        if (error.statusCode) {
            throw error;
        }

        // Handle invalid ObjectId
        if (error.name === 'CastError') {
            const err = new Error('Invalid user ID format');
            err.statusCode = STATUS.BAD_REQUEST;
            throw err;
        }

        // Database error
        console.error('Get user by ID error:', error);
        const err = new Error('Failed to fetch user');
        err.statusCode = STATUS.INTERNAL_SERVER_ERROR;
        throw err;
    }
};

/**
 * Update user role or status
 */
const updateUserRoleOrStatus = async (data, userId) => {
    try {
        // Validate input
        if (!data || typeof data !== "object") {
            const err = new Error("Invalid update data");
            err.statusCode = STATUS.BAD_REQUEST;
            throw err;
        }

        // Build update query
        const updateQuery = {};
        if (data.userRole) updateQuery.userRole = data.userRole;
        if (data.userStatus) updateQuery.userStatus = data.userStatus;

        if (Object.keys(updateQuery).length === 0) {
            const err = new Error("No valid fields provided to update");
            err.statusCode = STATUS.BAD_REQUEST;
            throw err;
        }

        // Update user
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateQuery,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            const err = new Error("No user found for the given id");
            err.statusCode = STATUS.NOT_FOUND;
            throw err;
        }

        // Return user without password
        const userObj = updatedUser.toObject();
        delete userObj.password;

        return userObj;

    } catch (error) {
        // Re-throw custom errors
        if (error.statusCode) {
            throw error;
        }

        // Handle validation errors
        if (error.name === 'ValidationError') {
            const validationErrors = {};
            Object.keys(error.errors).forEach(key => {
                validationErrors[key] = error.errors[key].message;
            });

            const err = new Error('Validation failed');
            err.statusCode = STATUS.UNPROCESSABLE_ENTITY;
            err.details = validationErrors;
            throw err;
        }

        // Handle invalid ObjectId
        if (error.name === 'CastError') {
            const err = new Error('Invalid user ID format');
            err.statusCode = STATUS.BAD_REQUEST;
            throw err;
        }

        // Database error
        console.error('Update user error:', error);
        const err = new Error('Failed to update user');
        err.statusCode = STATUS.INTERNAL_SERVER_ERROR;
        throw err;
    }
};

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    updateUserRoleOrStatus
};