const userController = require('../controllers/user.controller');
const userMiddle
const route = (app) => {
    app.patch(
        '/mba/api/v1/user/:id',
        userController.update
    );
}

module.exports = route;