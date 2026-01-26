const badRequestResponse = {
    success: false,
    err:" ",
    data:{},
    message:"Malformed Request | Bad Request"
}
console.log('Loaded theatre.middleware.js from:', __filename);
const {STATUS} = require('../utils/constants')
/**
 * 
 * @param  req -> HTTP request object
 * @param  res  ->HTTP response object
 * @param  next  -> next middleware function
 * @returns -> whether the request is valid or not 
 */
const validateMovieCreateRequest = (req, res, next) => {
    //validate the movie name
    if (!req.body.name) {
        badRequestResponse.err = 'Movie name is required';
        return res.status(400).json(badRequestResponse);
    }
    // validate the movie description
    if(!req.body.description){
        badRequestResponse.err = 'Movie description is required';
        return res.status(400).json(badRequestResponse);
    }
    // validate the movie casts
    if(!req.body.casts || !(req.body.casts instanceof Array) || req.body.casts.length === 0){
         badRequestResponse.err = 'Movie casts is required';
         return res.status(400).json(badRequestResponse);

    }
    // validate the movie trailer url
    if(!req.body.trailerUrl){
        badRequestResponse.err = 'Movie trailerUrl is required';
         return res.status(400).json(badRequestResponse);
    }
    // validate the release date of the movie
    if(!req.body.releaseDate){
        badRequestResponse.err = 'Movie releaseDate is required';
         return res.status(400).json(badRequestResponse);
    }
    // validate director of the movie
    if(!req.body.director){
        badRequestResponse.err = 'Movie director is required';
        return res.status(400).json(badRequestResponse);
    }
    next();
    };
    


module.exports = {
    validateMovieCreateRequest
};