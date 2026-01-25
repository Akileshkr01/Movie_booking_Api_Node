const userService = require('../services/user.service');
const {} = require('../utils/responseBody');

const signup = async (req,res) => {
    try {
        const response = await userService.createUser(req.body);
        
    } catch (error) {
        
    }
}
