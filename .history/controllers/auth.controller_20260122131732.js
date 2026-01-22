const userService = require('../services/user.service');
const { successResponseBody, errorResponseBody } = require('../utils/responseBody');

const signup = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);

        return res.status(201).json({
            ...successResponseBody,
            message: 'Successfully registered a user',
            data: user
        });

    } catch (error) {
        const statusCode = error.statusCode || 400;

        return res.status(statusCode).json({
            ...errorResponseBody,
            message: error.message || 'Something went wrong',
            err: error.details || error.message
        });
    }
};

const signin = async (req,res) => {
    try {
        const user = wait userService.getUserByEmail(req.body.email);
        
    } catch (error) {
        
    }
}
module.exports = {
    signup
};
