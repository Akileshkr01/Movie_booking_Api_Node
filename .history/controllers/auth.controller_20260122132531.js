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
        const isValidPassword = await user.isValidPassword(req.body.password);
        if(!isValidPassword){
            throw {err: 'invalid password for the given email', code: 401};
        }
        successResponseBody.message = "Successfully logged in";
        successResponseBody.data = {
            email : user.email,
            role: user.userRole,
            status: user.userStatus,
            token:
        };
        return res.status(200).json(successResponseBody);
    } catch (error) {
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
}
module.exports = {
    signup
};
