const paymentService = require('../services/payment.service');
const {BOOKING_STATUS , STATUS} = require('../utils/constants');
const {errorResponseBody , successResponseBody} = require('../utils/responseBody');

const create = async (req, res) => {
    try{
        const response = await paymentService.createPayment(req.body);
        if(response.status == BOOKING_STATUS.expired){
            errorResponseBody.err = 'The payment took more than 5 minutes to get processed , hence you booking ';
            errorResponseBody.data = response;
            return res.status(STATUS.GONE).json(errorResponseBody);
        }
        if(response.status == BOOKING_STATUS.cancelled)
    }
}
