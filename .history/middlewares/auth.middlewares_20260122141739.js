const { errorResponseBody } = require('../utils/responseBody');
/**
 * validate for user signup
 * @param  req -> http request object
 * @param  res  -> http response object
 * @param  next -> next middleware
 * @returns 
 */
const validateSignupRequest = (req, res, next) => {
    // Validate name
    if (!req.body.name) {
        return res.status(400).json({
            ...errorResponseBody,
            err: 'Name of the user is required'
        });
    }

    // Validate email presence
    if (!req.body.email) {
        return res.status(400).json({
            ...errorResponseBody,
            err: 'Email of the user is required'
        });
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({
            ...errorResponseBody,
            err: 'Invalid email format'
        });
    }

    // Validate password presence
    if (!req.body.password) {
        return res.status(400).json({
            ...errorResponseBody,
            err: 'Password of the user is required'
        });
    }

    // Request is valid
    next();
};


const validateSigninRequest = async (req,res,next) => {
    // validate user email presence
    if(!req.body.email){
        error
    }
}
module.exports = {
    validateSignupRequest
};
