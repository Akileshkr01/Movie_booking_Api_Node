const showController = require('../controllers/show.controller');
const authMiddlewares = require('../middlewares/auth.middlewares');
const showMiddlewares = require('../middlewares/show.middlewares');
const routes = (app) => {
    app.post(
        '/mba/api/v1/show',
        authMiddlewares.is
        showController.create
    );
}

module.exports = routes;