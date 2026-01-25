const jwt = require('jsonwebtoken');
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

const signin = async (req, res) => {
    try {
        const user = await userService.getUserByEmail(req.body.email);

        const isValidPassword = await user.isValidPassword(req.body.password);
        if (!isValidPassword) {
            throw { err: "Invalid password for the given email", code: 401 };
        }
        const token = jwt.sign({id:user.id , email:user.email},
            process.env.AUTH_KEY,
        {expiresIn: '1h'}
        );
        
        console.log(jwt.verify(token,process.env.AUTH_KEY));
        
        successResponseBody.message = "Successfully logged in";
        successResponseBody.data = {
            email: user.email,
            role: user.userRole,
            status: user.userStatus,
            token: token 
        };

        return res.status(200).json(successResponseBody);

    } catch (error) {
        if (error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }

        errorResponseBody.err = "Internal Server Error";
        return res.status(500).json(errorResponseBody);
    }
};

const resetPassword = async (req,res) => {
    try {
        const user = await userService.getUserById(req.body.id);
        const is
    } catch (error) {
        
    }
}

module.exports = {
    signup,
    signin
};
