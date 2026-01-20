const theatreService = require('../services/theatre.service');
const { successResponseBody, errorResponseBody } = require('../utils/responseBody');

const create = async (req, res) => {
    try {
        const response = await theatreService.createTheatre(req.body);
        if (response && response.err) {
            return res.status(response.code).json({
                ...errorResponseBody,
                err: response.err
            });
        }
        return res.status(201).json({
            ...successResponseBody,
            data: response,
            message: "Successfully created the theatre"
        });
    } catch (error) {
        return res.status(500).json({ ...errorResponseBody, err: error.message });
    }
};

const destroy = async (req, res) => {
    try {
        const response = await theatreService.deleteTheatre(req.params.id);
        if (response && response.err) {
            return res.status(response.code).json({
                ...errorResponseBody,
                err: response.err
            });
        }
        return res.status(200).json({
            ...successResponseBody,
            data: response,
            message: "Successfully deleted the given theatre"
        });
    } catch (error) {
        return res.status(500).json({ ...errorResponseBody, err: error.message });
    }
};

const getTheatre = async (req, res) => {
    try {
        const response = await theatreService.getTheatre(req.params.id);
        if (response && response.err) {
            return res.status(response.code).json({
                ...errorResponseBody,
                err: response.err
            });
        }
        return res.status(200).json({
            ...successResponseBody,
            data: response,
            message: "Successfully fetched the data of the theatre"
        });
    } catch (error) {
        return res.status(500).json({ ...errorResponseBody, err: error.message });
    }
};

const getTheatres = async (req, res) => {
    try {
        const response = await theatreService.getAllTheatres(req.query);
        return res.status(200).json({
            ...successResponseBody,
            data: response,
            message: "Successfully fetched all the theatres"
        });
    } catch (error) {
        console.error("Error in getTheatres Controller:", error);
        return res.status(500).json({
            ...errorResponseBody,
            err: error.message
        });
    }
};

const update = async (req, res) => {
    try {
        const response = await theatreService.updateTheatre(req.params.id, req.body);
        if (response && response.err) {
            return res.status(response.code).json({
                ...errorResponseBody,
                err: response.err
            });
        }
        return res.status(200).json({
            ...successResponseBody,
            data: response,
            message: "Successfully updated the theatre"
        });
    } catch (error) {
        return res.status(500).json({
            ...errorResponseBody,
            err: error.message
        });
    }
};
console.log("CONTROLLER ID:", req.params.id, typeof req.params.id);

const updateMovies = async (req, res) => {
    try {
        
        const response = await theatreService.updateMoviesInTheatre(
            req.params.id,
            req.body.movieIds,
            req.body.insert
        );
        if (response && response.err) {
            return res.status(response.code).json({
                ...errorResponseBody,
                err: response.err
            });
        }
        return res.status(200).json({
            ...successResponseBody,
            data: response,
            message: "Successfully updated movies in the theatre"
        });
    } catch (error) {
        return res.status(500).json({
            ...errorResponseBody,
            err: error.message
        });
    }
};

module.exports = {
    create,
    destroy,
    getTheatre,
    getTheatres,
    update,
    updateMovies
};
