const theatreController = require('../controllers/theatre.controller');
const theatreMiddleware = require('../middlewares/theatre.middleware');

const routes = (app) => {
    console.log('Theatre routes registered');
    
    app.post(
        '/mba/api/v1/theatres', 
        theatreMiddleware.validateTheatreCreateRequest,
        theatreController.create
    );
};

module.exports = routes;