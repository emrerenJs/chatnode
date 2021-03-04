const ResponseModel = require('../models/ResponseModel')

const isAuthenticated = (req,res,next) => {
    if(req.isAuthenticated()){
        next();
    }
    else{
        res.json(ResponseModel.unAuthorized());
    }
}

module.exports = isAuthenticated;