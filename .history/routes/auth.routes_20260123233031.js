const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middlewares');

router.post('/signup', authMiddleware.validateSignupRequest, authController.signup);
router.post('/signin', authMiddleware.validateSigninRequest, authController.signin);
router.patch('/reset', authMiddleware.isAuthenticated, authMiddleware.validateResetPasswordRequest, authController.resetPassword);

module.exports = router;
