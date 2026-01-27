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

    app.get(
        '/mba/api/v1/show',
        showController.getShow
    );

    app.delete(
        '/mba/api/v1/show',
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        showController.destroy
    );

    app.patch(
        '/mba/api/v1/show/:id',
        auth
    )
}

module.exports = routes;
 