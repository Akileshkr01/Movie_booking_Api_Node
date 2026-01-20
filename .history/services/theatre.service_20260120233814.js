const mongoose = require('mongoose');
const Theatre = require('../models/theatre.model');
const Movie = require('../models/movie.model');
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
            return { err, code: 422 };
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
            return { err: "No theatre found", code: 404 };
        }
        return response;
    } catch {
        return { err: "Invalid theatre ID", code: 400 };
    }
};

/**
 * GET ONE THEATRE
 */
const getTheatre = async (id) => {
    try {
        const response = await Theatre.findById(id);
        if (!response) {
            return { err: "No theatre found", code: 404 };
        }
        return response;
    } catch {
        return { err: "Invalid theatre ID", code: 400 };
    }
};

/**
 * GET ALL THEATRES
 */
const getAllTheatres = async (queryParams) => {
    try {
        const query = {};
        const options = {};

        // Filters
        if (queryParams.city) query.city = queryParams.city;
        if (queryParams.pincode) query.pincode = queryParams.pincode;
        if (queryParams.name) query.name = queryParams.name;

        // Filter by movieId
        if (queryParams.movieId) {
            if (!mongoose.Types.ObjectId.isValid(queryParams.movieId)) {
                return {
                    err: "Invalid movieId format",
                    code: 400
                };
            }
            query.movies = queryParams.movieId;
        }

        // Limit
        if (queryParams.limit) {
            options.limit = parseInt(queryParams.limit, 10);
        }

        // Pagination (skip is page number)
        if (queryParams.skip !== undefined) {
            const perPage = options.limit || 5;
            options.skip = parseInt(queryParams.skip, 10) * perPage;
        }

        const theatres = await Theatre.find(query, null, options).populate('movies');
        return theatres;

    } catch (error) {
        console.error("Error in getAllTheatres:", error);
        return {
            err: "Database error while fetching theatres",
            code: 500
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
            return { err: "No theatre found", code: 404 };
        }

        return response;

    } catch (error) {
        // Mongoose validation error
        if (error.name === 'ValidationError') {
            const err = {};
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message;
            });
            return { err, code: 422 };
        }

        // Invalid ObjectId or other errors
        return { err: "Invalid theatre ID", code: 400 };
    }
};


/**
 * UPDATE MOVIES IN THEATRE
 */
const updateMoviesInTheatres = async (theatreId, movieIds, insert) => {
    const theatre = await Theatre.findById(theatreId);
    if (!theatre) {
        return { err: "No theatre found", code: 404 };
    }

    if (insert) {
        movieIds.forEach(id => theatre.movies.addToSet(id));
    } else {
        theatre.movies = theatre.movies.filter(
            id => !movieIds.includes(id.toString())
        );
    }

    await theatre.save();
    return theatre.populate('movies'  );
};

const getMoviesInAtheatre = async (id) => {
    try {
        //  Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return {
                err: 'Invalid theatre id',
                code: 400
            };
        }

        //  Fetch theatre with movies populated
        const theatre = await Theatre.findById(
            id,
            { name: 1, movies: 1,address: 1 }
        ).populate('movies');

        if (!theatre) {
            return {
                err: 'No theatre with the given id found',
                code: 404
            };
        }

        return theatre;

    } catch (error) {
        console.error('Error in getMoviesInAtheatre:', error);
        return {
            err: 'Database error while fetching movies in theatre',
            code: 500
        };
    }
};

const checkMovieInATheatre = async (theatreId,movieId) => {
    try {
        let response = await Theatre.findById(theatreId);
        return response.movies.indexOf()
    } catch (error) {
        
    }
}

module.exports = {
    createTheatre,
    deleteTheatre,
    getTheatre,
    getAllTheatres,
    updateTheatre,
    updateMoviesInTheatres,
    getMoviesInAtheatre
};

