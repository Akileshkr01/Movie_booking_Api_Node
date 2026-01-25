const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");
const { USER_ROLE } = require("../utils/constants");

/**
 * Fully patched signup request validator
 * Handles missing `next` gracefully and malformed input
 */
const validateSignupRequest = (req, res, next) => {
  try {
    console.log("validateSignupRequest called, next =", next);
    // Check if next is a function, otherwise provide a no-op
    if (typeof next !== 'function') {
      next = () => {};
    }

    // Ensure body exists
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({
        success: false,
        err: "Request body is required and must be a valid JSON object",
        data: {}
      });
    }

    const { name, email, password } = req.body;

    // Validate name
    if (!name || !name.toString().trim()) {
      return res.status(400).json({
        success: false,
        err: "Name of the user is required",
        data: {}
      });
    }

    // Validate email
    if (!email || !email.toString().trim()) {
      return res.status(400).json({
        success: false,
        err: "Email of the user is required",
        data: {}
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.toString().trim())) {
      return res.status(400).json({
        success: false,
        err: "Invalid email format",
        data: {}
      });
    }

    // Validate password
    if (!password || !password.toString().trim()) {
      return res.status(400).json({
        success: false,
        err: "Password of the user is required",
        data: {}
      });
    }

    // Everything is valid, call next
    next();

  } catch (err) {
    // Catch any unexpected errors and return 500
    console.error("Error in validateSignupRequest:", err);
    return res.status(500).json({
      success: false,
      err: "Internal Server Error in request validation",
      data: {}
    });
  }
};




/**
 * Validate user signin request
 */
const validateSigninRequest = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !email.trim()) {
    return res.status(400).json({
      success: false,
      err: "No email provided for sign in",
      data: {}
    });
  }

  if (!password || !password.trim()) {
    return res.status(400).json({
      success: false,
      err: "No password provided for sign in",
      data: {}
    });
  }

  next();
};

/**
 * Authentication middleware
 */
const isAuthenticated = async (req, res, next) => {
  try {
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

    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      err: "Invalid or expired token",
      data: {}
    });
  }
};

const validateResetPasswordRequest = (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !oldPassword.trim()) {
    return res.status(400).json({
      success: false,
      err: "Missing the old password",
      data: {}
    });
  }

  if (!newPassword || !newPassword.trim()) {
    return res.status(400).json({
      success: false,
      err: "Missing the new password",
      data: {}
    });
  }

  next();
};

const isAdmin = (req, res, next) => {
  if (!req.user || req.user.userRole !== USER_ROLE.ADMIN) {
    return res.status(403).json({
      success: false,
      err: "User is not an admin",
      data: {}
    });
  }
  next();
};

const isClient = (req, res, next) => {
  if (!req.user || req.user.userRole !== USER_ROLE.CLIENT) {
    return res.status(403).json({
      success: false,
      err: "User is not a client",
      data: {}
    });
  }
  next();
};

const isAdminOrClient = (req, res, next) => {
  if (
    !req.user ||
    (req.user.userRole !== USER_ROLE.ADMIN &&
     req.user.userRole !== USER_ROLE.CLIENT)
  ) {
    return res.status(403).json({
      success: false,
      err: "Unauthorized role",
      data: {}
    });
  }
  next();
};

module.exports = {
  validateSignupRequest,
  validateSigninRequest,
  isAuthenticated,
  validateResetPasswordRequest,
  isAdmin,
  isClient,
  isAdminOrClient
};
