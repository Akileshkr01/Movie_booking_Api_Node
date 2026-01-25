const User = require('../models/user.model');

const createUser = async (data) => {
    try {
        const user = await User.create({
            name: data.name,
            email: data.email,
            password: data.password, // kept as-is (future enhancement)
            userRole: data.userRole,
            userStatus: data.userStatus
        });

        // Do not expose password in response
        user.password = undefined;

        return user;
    } catch (error) {
        if(error.name == 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach(key) => {
                err[key]
            }
        }
        throw error; // let controller decide response
    }
};

module.exports = {
    createUser
};
