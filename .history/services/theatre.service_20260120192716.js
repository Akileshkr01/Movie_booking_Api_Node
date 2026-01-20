const Theatre = require('../models/theatre.model');
const Movie = require('../')
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
    const query = {};
    const options = {};

    // Filters
    if (queryParams.city) query.city = queryParams.city;
    if (queryParams.pincode) query.pincode = queryParams.pincode;
    if (queryParams.name) query.name = queryParams.name;

    // Limit 
    if (queryParams.limit) {
        options.limit = parseInt(queryParams.limit);
    }

    // Pagination only when skip exists and for first page skip value is 0
    if (queryParams.skip !== undefined) {
        const perPage = queryParams.limit
            ? parseInt(queryParams.limit)
            : 5;

        // skip is page number
        options.skip = parseInt(queryParams.skip) * perPage;
    }

    return Theatre.find(query, null, options);
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

module.exports = {
    createTheatre,
    deleteTheatre,
    getTheatre,
    getAllTheatres,
    updateTheatre,
    updateMoviesInTheatres
};

