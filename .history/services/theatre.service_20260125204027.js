const mongoose = require('mongoose');
const Theatre = require('../models/theatre.model');
const Movie = require('../models/movie.model');
const { STATUS } = require('../utils/constants');

/**
 * CREATE THEATRE
 */
const createTheatre = async (data) => {
    try {
        return await Theatre.create(data);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const err = {};
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message;
            });
            return { err, code: STATUS.UNPROCESSABLE_ENTITY };
        }
        throw error;
    }
};

/**
 * DELETE THEATRE
 */
const deleteTheatre = async (id) => {
    try {
        const response = await Theatre.findByIdAndDelete(id);
        if (!response) {
            return { err: "No theatre found", code: STATUS.NOT_FOUND };
        }
        return response;
    } catch {
        return { err: "Invalid theatre ID", code: STATUS.BAD_REQUEST };
    }
};

/**
 * GET ONE THEATRE
 */
const getTheatre = async (id) => {
    try {
        const response = await Theatre.findById(id);
        if (!response) {
            return { err: "No theatre found", code: STATUS.NOT_FOUND };
        }
        return response;
    } catch {
        return { err: "Invalid theatre ID", code: STATUS.BAD_REQUEST };
    }
};

/**
 * GET ALL THEATRES
 */
const getAllTheatres = async (queryParams) => {
    try {
        const query = {};
        const options = {};

        if (queryParams.city) query.city = queryParams.city;
        if (queryParams.pincode) query.pincode = queryParams.pincode;
        if (queryParams.name) query.name = queryParams.name;

        if (queryParams.movieId) {
            if (!mongoose.Types.ObjectId.isValid(queryParams.movieId)) {
                return {
                    err: "Invalid movieId format",
                    code: STATUS.BAD_REQUEST
                };
            }
            query.movies = queryParams.movieId;
        }

        if (queryParams.limit) {
            options.limit = parseInt(queryParams.limit, 10);
        }

        if (queryParams.skip !== undefined) {
            const perPage = options.limit || 5;
            options.skip = parseInt(queryParams.skip, 10) * perPage;
        }

        return await Theatre.find(query, null, options).populate('movies');

    } catch (error) {
        console.error("Error in getAllTheatres:", error);
        return {
            err: "Database error while fetching theatres",
            code: STATUS.INTERNAL_SERVER_ERROR
        };
    }
};

/**
 * UPDATE THEATRE
 */
const updateTheatre = async (id, data) => {
    try {
        const response = await Theatre.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });

        if (!response) {
            return { err: "No theatre found", code: STATUS.NOT_FOUND };
        }

        return response;

    } catch (error) {
        if (error.name === 'ValidationError') {
            const err = {};
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message;
            });
            return { err, code: STATUS.UNPROCESSABLE_ENTITY };
        }

        return { err: "Invalid theatre ID", code: STATUS.BAD_REQUEST };
    }
};

/**
 * UPDATE MOVIES IN THEATRE
 */
const updateMoviesInTheatres = async (theatreId, movieIds, insert) => {
    const theatre = await Theatre.findById(theatreId);
    if (!theatre) {
        return { err: "No theatre found", code: STATUS.NOT_FOUND };
    }

    if (insert) {
        movieIds.forEach(id => theatre.movies.addToSet(id));
    } else {
        theatre.movies = theatre.movies.filter(
            id => !movieIds.includes(id.toString())
        );
    }

    await theatre.save();
    return theatre.populate('movies');
};

/**
 * GET MOVIES IN A THEATRE
 */
const getMoviesInAtheatre = async (id) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return {
                err: 'Invalid theatre id',
                code: STATUS.BAD_REQUEST
            };
        }

        const theatre = await Theatre.findById(
            id,
            { name: 1, movies: 1, address: 1 }
        ).populate('movies');

        if (!theatre) {
            return {
                err: 'No theatre with the given id found',
                code: STATUS.NOT_FOUND
            };
        }

        return theatre;

    } catch (error) {
        console.error('Error in getMoviesInAtheatre:', error);
        return {
            err: 'Database error while fetching movies in theatre',
            code: STATUS.INTERNAL_SERVER_ERROR
        };
    }
};

/**
 * CHECK MOVIE IN A THEATRE
 */
const checkMovieInATheatre = async (theatreId, movieId) => {
    try {
        if (
            !mongoose.Types.ObjectId.isValid(theatreId) ||
            !mongoose.Types.ObjectId.isValid(movieId)
        ) {
            return {
                err: "Invalid theatreId or movieId",
                status: STATUS.BAD_REQUEST
            };
        }

        const theatre = await Theatre.findById(theatreId);

        if (!theatre) {
            return {
                err: "No such theatre found for the given id",
                status: STATUS.NOT_FOUND
            };
        }

        return {
            isMoviePresent: theatre.movies.includes(movieId)
        };

    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = {
    createTheatre,
    deleteTheatre,
    getTheatre,
    getAllTheatres,
    updateTheatre,
    updateMoviesInTheatres,
    getMoviesInAtheatre,
    checkMovieInATheatre
};
