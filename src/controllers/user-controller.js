const {StatusCodes} = require('http-status-codes');

const {userService} = require('../services');

const {SuccessResponse,ErrorResponse} = require('../utils/common');

/*
* POST :/signup
* req-body {email:'pkr@k.com', password: '12345}
*/

async function signup(req,res) {
    try {
        const user = await userService.create({
            email:req.body.email,
            password:req.body.password
        });
        SuccessResponse.data= user;
        return res 
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

module.exports = {
    signup
}