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


const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];

        if (!token) {
            return res.status(401).json({
                success: false,
                err: "No token provided",
                data: {}
            });
        }

        // verify token (throws error if invalid/expired)
        const decoded = jwt.verify(token, process.env.AUTH_KEY);

        const user = await userService.getUserById(decoded.id);

        // attach full user object to request
        req.user = user;

        return next();

    } catch (error) {
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                err: "Invalid or expired token",
                data: {}
            });
        }

        if (error.code === 404) {
            return res.status(404).json({
                success: false,
                err: "User doesn't exist",
                data: {}
            });
        }

        return res.status(500).json({
            success: false,
            err: "Internal Server Error",
            data: {}
        });
    }
};

module.exports = {
    validateSignupRequest,
    validateSigninRequest,
    isAuthenticated
};
 