const paymentService = require('../services/payment.service');
const {BOOKING_STATUS , STATUS} = require('../utils/constants');
const {errorResponseBody , successResponseBody} = require('../utils/responseBody');

const create = async (req, res) => {
    try{
        const response = await paymentService.createPayment(req.body);
        
    }
}
