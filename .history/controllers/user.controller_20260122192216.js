const userService = require('../services/user.service');
const {errorResponseBody,successResponseBody} = require('../utils/responseBody');

const update = async (req,res) => {
    try {
        const response = await userService.updateUserRoleOrStatus(re)
    } catch (error) {
        
    }
}