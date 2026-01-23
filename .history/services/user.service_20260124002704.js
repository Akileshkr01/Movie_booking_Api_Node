const User = require('../models/user.model');
const { USER_ROLE, USER_STATUS } = require('../utils/constants');

/**
 * Create a new user
 */
const createUser = async (data) => {
    try {
       
        const userRole = data.userRole || USER_ROLE.CUSTOMER;
        let userStatus = data.userStatus || USER_STATUS.APPROVED;

        if (userRole === USER_ROLE.CUSTOMER && data.userStatus && data.userStatus !== USER_STATUS.APPROVED) {
            const err = new Error('Customer cannot set custom user status');
            err.statusCode = 400;
            throw err;
        }

        if (userRole !== USER_ROLE.CUSTOMER) {
            userStatus = USER_STATUS.PENDING;
        }

        
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
        
        if (error.name === 'ValidationError') {
            const validationErrors = {};
            Object.keys(error.errors).forEach(key => {
                validationErrors[key] = error.errors[key].message;
            });

            const err = new Error('Validation failed');
            err.statusCode = 422;
            err.details = validationErrors;
            throw err;
        }

        if (error.code === 11000) {
            const err = new Error('Email already exists');
            err.statusCode = 409;
            throw err;
        }

        
        throw error;
    }
};

/**
 * Get user by email
 */
const getUserByEmail = async (email) => {
    const user = await User.findOne({ email });

    if (!user) {
        const err = new Error("No user found for the given email");
        err.statusCode = 404;
        throw err;
    }

    return user;
};

/**
 * Get user by ID
 */
const getUserById = async (id) => {
    const user = await User.findById(id);

    if (!user) {
        const err = new Error("No user found for the given id");
        err.statusCode = 404;
        throw err;
    }

    return user;
};

/**
 * Update user role or status
 */
const updateUserRoleOrStatus = async (data, userId) => {
    if (!data || typeof data !== "object") {
        const err = new Error("Invalid update data");
        err.statusCode = 400;
        throw err;
    }

    const updateQuery = {};
    if (data.userRole) updateQuery.userRole = data.userRole;
    if (data.userStatus) updateQuery.userStatus = data.userStatus;

    if (Object.keys(updateQuery).length === 0) {
        const err = new Error("No valid fields provided to update");
        err.statusCode = 400;
        throw err;
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        updateQuery,
        { new: true, runValidators: true }
    );

    if (!updatedUser) {
        const err = new Error("No user found for the given id");
        err.statusCode = 404;
        throw err;
    }

    return updatedUser;
};

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    updateUserRoleOrStatus
};
