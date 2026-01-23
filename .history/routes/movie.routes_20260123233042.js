const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');
const movieMiddlewares = require('../middlewares/movie.middleware');

router.post('/', movieMiddlewares.validateMovieCreateRequest, movieController.createMovie);
router.get('/:id', movieController.getMovie);
router.delete('/:id', movieController.deleteMovie);
router.put('/:id', movieController.updateMovie);
router.patch('/:id', movieController.updateMovie);
router.get('/', movieController.getMovies);

module.exports = router;
