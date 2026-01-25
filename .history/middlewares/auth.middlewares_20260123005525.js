const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");
const { USER_ROLE } = require("../utils/constants");

/**
 * Validate user signup request
 */
const validateSignupRequest = (req, res, next) => {

console.log("Middleware called, next:", next);
  const { name, email, password } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      success: false,
      err: "Name of the user is required",
      data: {}
    });
  }

  if (!email || !email.trim()) {
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

  if (!password || !password.trim()) {
    return res.status(400).json({
      success: false,
      err: "Password of the user is required",
      data: {}
    });
  }

  next();
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