const {STATUS} = require('../utils/constants');
const  {errorResponseBody} = require('../utils/responseBody');
const ObjectId = require('mongoose').Types.ObjectId;

const verifyPaymentCreateRequest = async (req , res , next) => {
    // validate booking id presence







    next();

}

module.exports ={
    verifyPaymentCreateRequest
}