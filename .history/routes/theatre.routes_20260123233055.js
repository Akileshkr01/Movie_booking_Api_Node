const express = require('express');
const router = express.Router();
const theatreController = require('../controllers/theatre.controller');
const theatreMiddleware = require('../middlewares/theatre.middleware');
const authMiddleware = require('../middlewares/auth.middlewares');

router.post('/', theatreMiddleware.validateTheatreCreateRequest, theatreController.create);
router.delete('/:id', authMiddleware.isAuthenticated, theatreController.destroy);
router.get('/:id', theatreController.getTheatre);
router.get('/', theatreController.getTheatres);
router.patch('/:id', theatreController.update);
router.patch('/:id/movies', theatreMiddleware.validateUpdateMoviesRequest, theatreController.updateMovies);
router.get('/:id/movies', theatreController.getMovies);
router.get('/:theatreId/movies/:movieId', theatreController.checkMovie);

module.exports = router;
