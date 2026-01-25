const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");
const { USER_ROLE } = require("../utils/constants");
const { errorResponseBody } = require("../utils/responseBody");

/**
 * Validate user signup request
 */
const validateSignupRequest = (req, res, next) => {
  let { name, email, password } = req.body;

  // Normalize inputs
  name = name?.trim();
  email = email?.trim();
  password = password?.trim();

  if (!name) {
    return res.status(400).json({
      ...errorResponseBody,
      message: "Name is required"
    });
  }

  if (!email) {
    return res.status(400).json({
      ...errorResponseBody,
      message: "Email is required"
    });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      ...errorResponseBody,
      message: "Invalid email"
    });
  }

  if (!password) {
    return res.status(400).json({
      ...errorResponseBody,
      message: "Password is required"
    });
  }

  // Strong password rule: at least 8 chars, one uppercase, one lowercase, one number
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!strongPasswordRegex.test(password)) {
    return res.status(400).json({
      ...errorResponseBody,
      message: "Password must be at least 8 characters long and include uppercase, lowercase, and a number"
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
