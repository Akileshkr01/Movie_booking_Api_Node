const theatreController = require('../controllers/theatre.controller');

const routes = (app) => {
    console.log('Theatre routes registered');
    
    app.post(
        '/mba/api/v1/theatres',
        theatreController.create
    );
};

module.exports = routes;