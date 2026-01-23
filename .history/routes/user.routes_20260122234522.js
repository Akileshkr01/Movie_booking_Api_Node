const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middlewares');
const authMiddleware = require('../middlewares/auth.middlewares');

const route = (app) => {
    app.patch(
        '/mba/api/v1/users/:id', // Changed 'user' to 'users' to match REST standards
        authMiddleware.isAuthenticated,  
        authMiddleware.isAdmin,          
        userMiddleware.validateUpdateUserRequest, 
        userController.update            
    );
};

module.exports = route;