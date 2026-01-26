const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");
const { USER_ROLE, } = require("../utils/constants");
const { errorResponseBody } = require("../utils/responseBody");

/**
 * Validate user signup request
 */
const validateSignupRequest = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      ...errorResponseBody,
      message: "Name of the user is required"
    });
  }

  if (!email || !email.trim()) {
    return res.status(400).json({
      ...errorResponseBody,
      message: "Email of the user is required"
    });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      ...errorResponseBody,
      message: "Invalid email format"
    });
  }

  if (!password || !password.trim()) {
    return res.status(400).json({
      ...errorResponseBody,
      message: "Password of the user is required"
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
      ...errorResponseBody,
      message: "No email provided for sign in"
    });
  }

  if (!password || !password.trim()) {
    return res.status(400).json({
      ...errorResponseBody,
      message: "No password provided for sign in"
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
        ...errorResponseBody,
        message: "No token provided"
      });
    }

    const decoded = jwt.verify(token, process.env.AUTH_KEY);
    const user = await userService.getUserById(decoded.id);

    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({
      ...errorResponseBody,
      message: "Invalid or expired token"
    });
  }
};

/**
 * Validate reset password request
 */
const validateResetPasswordRequest = (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !oldPassword.trim()) {
    return res.status(400).json({
      ...errorResponseBody,
      message: "Missing the old password"
    });
  }

  if (!newPassword || !newPassword.trim()) {
    return res.status(400).json({
      ...errorResponseBody,
      message: "Missing the new password"
    });
  }

  next();
};

/**
 * Role-based middlewares
 */
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.userRole !== USER_ROLE.ADMIN) {
    return res.status(403).json({
      ...errorResponseBody,
      message: "User is not an admin"
    });
  }
  next();
};

const isClient = (req, res, next) => {
  if (!req.user || req.user.userRole !== USER_ROLE.CLIENT) {
    return res.status(403).json({
      ...errorResponseBody,
      message: "User is not a client"
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
      ...errorResponseBody,
      message: "Unauthorized role"
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
