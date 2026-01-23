const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middlewares');

router.get('/', authMiddleware.isAuthenticated, userController.getUsers);
router.get('/:id', authMiddleware.isAuthenticated, userController.getUserById);
router.patch('/:id', authMiddleware.isAuthenticated, userController.updateUser);

module.exports = router;
