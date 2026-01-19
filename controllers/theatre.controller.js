const theatreService = require('../services/theatre.service');
const { successResponseBody, errorResponseBody } = require('../utils/responseBody');

console.log('Loaded theatre.controller.js from:', __filename);

// CREATE
const create = async (req, res) => {
    try {
        const response = await theatreService.createTheatre(req.body);
        if (response?.err) {
            return res.status(response.code).json({ ...errorResponseBody, err: response.err });
        }
        return res.status(201).json({
            ...successResponseBody,
            data: response,
            message: 'Successfully created the theatre'
        });
    } catch (error) {
        return res.status(500).json({ ...errorResponseBody, err: error.message });
    }
};

// DELETE
const destroy = async (req, res) => {
    try {
        const response = await theatreService.deleteTheatre(req.params.id);
        if (response?.err) {
            return res.status(response.code).json({ ...errorResponseBody, err: response.err });
        }
        return res.status(200).json({
            ...successResponseBody,
            data: response,
            message: 'Successfully deleted the theatre'
        });
    } catch (error) {
        return res.status(500).json({ ...errorResponseBody, err: error.message });
    }
};

// READ ONE
const getTheatre = async (req, res) => {
    try {
        const response = await theatreService.getTheatre(req.params.id);
        if (response?.err) {
            return res.status(response.code).json({ ...errorResponseBody, err: response.err });
        }
        return res.status(200).json({
            ...successResponseBody,
            data: response,
            message: 'Successfully fetched theatre'
        });
    } catch (error) {
        return res.status(500).json({ ...errorResponseBody, err: error.message });
    }
};

// READ ALL
const getTheatres = async (req, res) => {
    try {
        const response = await theatreService.getAllTheatres(req.query);
        return res.status(200).json({
            ...successResponseBody,
            data: response,
            message: 'Successfully fetched all theatres'
        });
    } catch (error) {
        return res.status(500).json({ ...errorResponseBody, err: error.message });
    }
};

// UPDATE THEATRE
const update = async (req, res) => {
    try {
        const response = await theatreService.updateTheatre(req.params.id, req.body);
        if (response?.err) {
            return res.status(response.code).json({ ...errorResponseBody, err: response.err });
        }
        return res.status(200).json({
            ...successResponseBody,
            data: response,
            message: 'Successfully updated theatre'
        });
    } catch (error) {
        return res.status(500).json({ ...errorResponseBody, err: error.message });
    }
};

// UPDATE MOVIES
const updateMovies = async (req, res) => {
    try {
        const response = await theatreService.updateMoviesInTheatres(
            req.params.id,
            req.body.movieIds,
            req.body.insert
        );

        if (response?.err) {
            return res.status(response.code).json({ ...errorResponseBody, err: response.err });
        }

        return res.status(200).json({
            ...successResponseBody,
            data: response,
            message: 'Successfully updated movies'
        });
    } catch (error) {
        return res.status(500).json({ ...errorResponseBody, err: error.message });
    }
};

// ✅ EXPORT EVERYTHING (THIS IS CRITICAL)
module.exports = {
    create,
    destroy,
    getTheatre,
    getTheatres,
    update,
    updateMovies
};
