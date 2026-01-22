const User = require('../models/user.model');
const { USER_ROLE, USER_STATUS } = require('../utils/constants');

const createUser = async (data) => {
    try {
        // ---------------------------
        // Normalize input
        // ---------------------------
        const userRole = data.userRole || USER_ROLE.CUSTOMER;
        let userStatus = data.userStatus || USER_STATUS.APPROVED;

        // ---------------------------
        // Business rules validation
        // ---------------------------

        // CUSTOMER cannot set custom status
        if (userRole === USER_ROLE.CUSTOMER && data.userStatus && data.userStatus !== USER_STATUS.APPROVED) {
            const err = new Error('Customer cannot set custom user status');
            err.statusCode = 400;
            throw err;
        }

        // Non-customer users are always Pending
        if (userRole !== USER_ROLE.CUSTOMER) {
            userStatus = USER_STATUS.PENDING;
        }

        // ---------------------------
        // Create user in DB
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
        // Mongoose validation errors (includes enum errors)
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
        // Forward any other error
        // ---------------------------
        throw error;
    }
};

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw { err: "No user found for the given email", code: 404 };
        }

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


const getUserById = async (id) => {
    try {
        const user = await User.findById(id);

        if (!user) {
            throw { err: "No user found for the given id", code: 404 };
        }

        return user;
    } catch (error) {
        throw error;
    }
};


const updateUserRoleOrStatus = async (data, userId) => {
    try {
        const updateQuery = {};

        if (data.userRole) updateQuery.userRole = data.userRole;
        if (data.userStatus) updateQuery.userStatus = data.userStatus;

        if (Object.keys(updateQuery).length === 0) {
            throw { err: "No valid fields provided to update", code: 400 };
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateQuery,
            {
                new: true,          // return updated document
                runValidators: true // enforce enum validation
            }
        );

        if (!updatedUser) {
            throw { err: "No user found for the given id", code: 404 };
        }

        return updatedUser;

    } catch (error) {
        if(error.name == 'ValidationError'){
            let err = {};
            Object
            throw {err: 'the properties does validate the constraints, please check', code:400};
        }
        throw error;
    }
};


module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    updateUserRoleOrStatus
};
