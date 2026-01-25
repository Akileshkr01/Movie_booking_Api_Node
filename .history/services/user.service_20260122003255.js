const User = require('../models/user.model');

const createUser = async (data) => {
    try {
        


        const user = await User.create({
            name: data.name,
            email: data.email,
            password: data.password,
            userRole: data.userRole,
            userStatus: data.userStatus
        });
        if(!data.userRole || data.userRole == 'CUSTOMER'){
            if(data.userStatus && )
        }
        // Convert to plain object and remove password
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

        // Duplicate key error (email)
        if (error.code === 11000) {
            const err = new Error('Email already exists');
            err.statusCode = 409;
            throw err;
        }

        // Unknown error
        throw error;
    }
};

module.exports = {
    createUser
};
