const showController = require('../controllers/show.controller');
const authMiddlewares = require('../middlewares/auth.middlewares');
const showMiddlewares = require('../middlewares/show.middlewares');
const routes = (app) => {
    app.post(
        '/mba/api/v1/show',
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        showMiddlewares.validateCreateShowRequest,
        showController.create
    );

    app.get
}

module.exports = routes;