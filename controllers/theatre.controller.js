const theatreService = require('../services/theatre.service');
const { successResponseBody, errorResponseBody } = require('../utils/responseBody');

const create = async (req, res) => {
    try {
        const response = await theatreService.createTheatre(req.body);
        
        // Handle Validation Errors (422) returned from Service
        if (response && response.err) {
            return res.status(response.code || 422).json({
                ...errorResponseBody,
                err: response.err,
                message: "Validation failed on few parameters of the request body"
            });
        }
        
        // Handle Success
        return res.status(201).json({
            ...successResponseBody,
            data: response,
            message: "Successfully created the theatre"
        });

    } catch (error) {
        // Handle Server Crashes (500)
        return res.status(500).json({
            ...errorResponseBody,
            err: error.message
        });
    }
}

// CRITICAL: This must match what is called in theatre.routes.js
module.exports = {
    create
};