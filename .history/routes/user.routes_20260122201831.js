const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middlewares');
const route = (app) => {
    app.patch(
        '/mba/api/v1/user/:id',
        user
        userController.update
    );
}

module.exports = route;