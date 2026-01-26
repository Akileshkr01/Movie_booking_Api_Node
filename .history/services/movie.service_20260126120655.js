const Movie = require('../models/movie.model');
const { STATUS } = require('../utils/constants');

/**
 * Service to create a movie with Mongoose validation error handling
 */
const createMovie = async (data) => {
    try {
        const movie = await Movie.create(data);
        return movie;
    } catch (error) {
        if (error.name === 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });

            return {
                err,
                code: STATUS.UNPROCESSABLE_ENTITY
            };
        }

        r {
            err: error.message,
            code: STATUS.INTERNAL_SERVER_ERROR
        };
    }
};

/**
 * Service to delete a movie by ID
 */
const deleteMovie = async (id) => {
    try {
        const response = await Movie.findByIdAndDelete(id);

        if (!response) {
            return {
                err: "No movie record found for the id provided",
                code: STATUS.NOT_FOUND
            };
        }

        return response;
    } catch (error) {
        return {
            err: "Invalid ID format provided or database error",
            code: STATUS.BAD_REQUEST
        };
    }
};

/**
 * Service to fetch a single movie by ID
 */
const getMovieById = async (id) => {
    try {
        const movie = await Movie.findById(id);

        if (!movie) {
            return {
                err: "No movie found for the corresponding id provided",
                code: STATUS.NOT_FOUND
            };
        }

        return movie;
    } catch (error) {
        return {
            err: "Invalid ID format provided or database error",
            code: STATUS.BAD_REQUEST
        };
    }
};

/**
 * Service to update movie details
 */
const updateMovie = async (id, data) => {
    try {
        const movie = await Movie.findByIdAndUpdate(
            id,
            data,
            { new: true, runValidators: true }
        );

        if (!movie) {
            return {
                err: "No movie found for the corresponding id provided",
                code: STATUS.NOT_FOUND
            };
        }

        return movie;
    } catch (error) {
        return {
            err: error.message,
            code: STATUS.BAD_REQUEST
        };
    }
};

/**
 * Service to fetch movies based on filters
 */
const fetchMovies = async (filter) => {
    try {
        let query = {};

        if (filter.name) {
            query.name = { $regex: filter.name, $options: 'i' };
        }

        const movies = await Movie.find(query);

        if (!movies || movies.length === 0) {
            return {
                err: "Not able to find the queried movies",
                code: STATUS.NOT_FOUND
            };
        }

        return movies;
    } catch (error) {
        return {
            err: error.message,
            code: STATUS.INTERNAL_SERVER_ERROR
        };
    }
};

module.exports = {
    createMovie,
    deleteMovie,
    getMovieById,
    updateMovie,
    fetchMovies
};
