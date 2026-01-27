const showController = require('../controllers/show.controller');
const authMiddlewares = require('../')
const routes = (app) => {
    app.post(
        '/mba/api/v1/show',
        showController.create
    );
}

module.exports = routes;