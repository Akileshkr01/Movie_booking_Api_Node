const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middlewares');
const authMiddleware = require('../middlewares/auth.middlewares');
const route = (app) => {
    app.patch(
        '/mba/api/v1/user/:id',
        userMiddleware.validateUpdateUserRequest,
        auth
        userController.update
    );
}

module.exports = route;