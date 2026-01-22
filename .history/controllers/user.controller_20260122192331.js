const userService = require('../services/user.service');
const {errorResponseBody,successResponseBody} = require('../utils/responseBody');

const update = async (req,res) => {
    try {
        const response = await userService.updateUserRoleOrStatus(req.body,req.params.id);

        successResponseBody.data = response;
        successResponseBody.message = 'Successfully updated the user';
        return res.status(200).json(succes)
    } catch (error) {
        
    }
}