const validateMovieCreateRequest = (req, res, next) => {
    if (!req.body.name) {
        return res.status(400).json({
            success: false,
            message: 'Movie name is required',
            data: {},
            error: 'Name field missing'
        });
    }
    next();
};

module.exports = {
    validateMovieCreateRequest
};