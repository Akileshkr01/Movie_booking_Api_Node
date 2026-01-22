const jwt = require('jsonwebtoken');
const { errorResponseBody } = require('../utils/responseBody');
const userService = require('../services/user.service');
/**
 * validate for user signup
 * @param  req -> http request object
 * @param  res  -> http response object
 * @param  next -> next middleware
 * @returns 
 */
const validateSignupRequest = (req, res, next) => {
    // Validate name
    if (!req.body.name) {
        return res.status(400).json({
            ...errorResponseBody,
            err: 'Name of the user is required'
        });
    }

    // Validate email presence
    if (!req.body.email) {
        return res.status(400).json({
            ...errorResponseBody,
            err: 'Email of the user is required'
        });
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({
            ...errorResponseBody,
            err: 'Invalid email format'
        });
    }

    // Validate password presence
    if (!req.body.password) {
        return res.status(400).json({
            ...errorResponseBody,
            err: 'Password of the user is required'
        });
    }

    // Request is valid
    next();
};


const validateSigninRequest = async (req, res, next) => {
    // validate user email presence
    if (!req.body.email) {
        return res.status(400).json({
            success: false,
            err: "No email provided for sign in",
            data: {}
        });
    }

    // validate user password presence
    if (!req.body.password) {
        return res.status(400).json({
            success: false,
            err: "No password provided for sign in",
            data: {}
        });
    }

    // request is valid
    return next();
};


const isAuthenticated = async (req,res,next) => {
    try {
        const token = req.headers["x-access-token"];
    if(!token){
        errorResponseBody.err = "No token provided ";
        return res.status(403).json(errorResponseBody);
    }
    const response = jwt.verify(token, process.env.AUTH_KEY);
    if(!response){
        errorResponseBody.err = "Token not verfied";
        return res.status(401).json(errorResponseBody);
    }
    const user = await userService.getUserById(response.id);
    } catch (error) {
        if(error.code == 404){
            errorResponseBody.err = "User doesn't exist";
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(500)
    }
    
    
};
module.exports = {
    validateSignupRequest,
    validateSigninRequest
};
