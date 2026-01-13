const Movie = require('../models/movie.model');

const getMovieById = async (id) => {
    try {
        const movie = await Movie.findById(id);
        console.log("movie found", movie.id);
        if (!movie) {
            return {
                err: "No movie found for the corresponding id provided",
                code: 404
            };
        }
        return movie;
    } catch (err) {
        return {
            err: "Invalid ID format provided",
            code: 400
        };
    }
}

module.exports = {
    getMovieById
};