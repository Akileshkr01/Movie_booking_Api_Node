const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");

/**
 * Validate user signup request
 */
const validateSignupRequest = (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || name.trim() === "") {
        return res.status(400).json({
            success: false,
            err: "Name of the user is required",
            data: {}
        });
    }

    if (!email || email.trim() === "") {
        return res.status(400).json({
            success: false,
            err: "Email of the user is required",
            data: {}
        });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            err: "Invalid email format",
            data: {}
        });
    }

    if (!password || password.trim() === "") {
        return res.status(400).json({
            success: false,
            err: "Password of the user is required",
            data: {}
        });
    }

    return next();
};

/**
 * Validate user signin request
 */
const validateSigninRequest = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || email.trim() === "") {
        return res.status(400).json({
            success: false,
            err: "No email provided for sign in",
            data: {}
        });
    }

    if (!password || password.trim() === "") {
        return res.status(400).json({
            success: false,
            err: "No password provided for sign in",
            data: {}
        });
    }

    return next();
};

/**
 * Authentication middleware
 */
const isAuthenticated = async (req, res, next) => {
    try {
        // Recommended header format: Authorization: Bearer <token>
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                err: "No token provided",
                data: {}
            });
        }

        const decoded = jwt.verify(token, process.env.AUTH_KEY);

        const user = await userService.getUserById(decoded.id);

        req.user = user; // attach full user

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

 
const validateResetPasswordRequest = async (req,res,next)

module.exports = {
    validateSignupRequest,
    validateSigninRequest,
    isAuthenticated
};
