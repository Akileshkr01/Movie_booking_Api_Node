const express = require('express');
const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middlewares');
const authMiddleware = require('../middlewares/auth.middlewares');

const router = express.Router();

// Update user role/status (admin only)
router.patch(
  '/:id',
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  userMiddleware.validateUpdateUserRequest,
  userController.update
);

module.exports = router;
