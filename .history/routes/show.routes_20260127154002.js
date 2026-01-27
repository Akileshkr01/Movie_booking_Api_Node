const showController = require('../controllers/show.controller');

const routes = (app) => {
    app.post(
        '/mba/api/v1/show',
        showController.create
    );
}

