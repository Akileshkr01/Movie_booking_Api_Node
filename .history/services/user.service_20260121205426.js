const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const createUser = async (data) => {
    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await User.create({
            ...data,
            password: hashedPassword
        });

        // Remove password from response
        user.password = undefined;
        return user;

    } catch (error) {
        throw error;
    }
};

module.exports = {
    createUser
};
