const express = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middlewares');

const router = express.Router();

// Signup
router.post(
  '/signup',
  authMiddleware.validateSignupRequest,
  authController.signup
);

// Signin
router.post(
  '/signin',
  authMiddleware.validateSigninRequest,
  authController.signin
);

// Reset Password
router.patch(
  '/reset',
  authMiddleware.isAuthenticated,
  authMiddleware.validateResetPasswordRequest,
  authController.resetPassword
);

module.exports = router;
