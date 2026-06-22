const Movie = require('../models/movie.model');
const { STATUS } = require('../utils/constants');

/**
 * Create a movie
 */
const createMovie = async (data) => {
    try {
        return await Movie.create(data);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });

            throw { err, code: STATUS.UNPROCESSABLE_ENTITY };
        }

        throw { err: error.message, code: STATUS.INTERNAL_SERVER_ERROR };
    }
};

/**
 * Delete a movie
 */
const deleteMovie = async (id) => {
    let movie;

    try {
        movie = await Movie.findByIdAndDelete(id);
    } catch {
        throw {
            err: "Invalid ID format provided",
            code: STATUS.BAD_REQUEST
        };
    }

    if (!movie) {
        throw {
            err: "No movie record found for the id provided",
            code: STATUS.NOT_FOUND
        };
    }

    return movie;
};

/**
 * Get movie by ID
 */
const getMovieById = async (id) => {
    let movie;

    try {
        movie = await Movie.findById(id);
    } catch {
        throw {
            err: "Invalid ID format provided",
            code: STATUS.BAD_REQUEST
        };
    }

    if (!movie) {
        throw {
            err: "No movie found for the corresponding id provided",
            code: STATUS.NOT_FOUND
        };
    }

    return movie;
};

/**
 * Update movie
 */
const updateMovie = async (id, data) => {
    let movie;

    try {
        movie = await Movie.findByIdAndUpdate(
            id,
            data,
            { new: true, runValidators: true }
        );
    } catch (error) {
        throw {
            err: error.message,
            code: STATUS.BAD_REQUEST
        };
    }

    if (!movie) {
        throw {
            err: "No movie found for the corresponding id provided",
            code: STATUS.NOT_FOUND
        };
    }

    return movie;
};

/**
 * Fetch movies
 */
const fetchMovies = async (filter) => {
    const query = {};

    if (filter.name) {
        query.name = { $regex: filter.name, $options: 'i' };
    }

    const movies = await Movie.find(query);

    if (!movies.length) {
        throw {
            err: "Not able to find the queried movies",
            code: STATUS.NOT_FOUND
        };
    }

    return movies;
};

module.exports = {
    createMovie,
    deleteMovie,
    getMovieById,
    updateMovie,
    fetchMovies
};
