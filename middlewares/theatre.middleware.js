const { errorResponseBody }= require('../utils/responseBody');
const validateTheatreCreateRequest = async(req,res,next) => {
    // validation for the presence of name
    if(!req.body.name){
        errorResponseBody.message =" the name of the theatre is not present in the request ";
        return res.status(400).json(errorResponseBody);
    }
    //validation for the presence of pincode
    if(!req.body.pincode){
        errorResponseBody.message =" the pincode of the theatre is not present in the request";
        return res.status(400).json(errorResponseBody);
    }
    //validation for the presence of city
    if(!req.body.city){
        errorResponseBody.message = "the city of the theatre is not present in  the request";
        return res.status(400).json(errorResponseBody);
    }
    next(); // everything is fine move to the next middleware
}

module.exports = {
    validateTheatreCreateRequest
}