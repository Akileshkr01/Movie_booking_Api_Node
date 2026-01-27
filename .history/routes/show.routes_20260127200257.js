const showController = require('../controllers/show.controller');
const authMiddlewares = require('../middlewares/auth.middlewares');
const 
const routes = (app) => {
    app.post(
        '/mba/api/v1/show',
        showController.create
    );
}

module.exports = routes;