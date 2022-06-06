const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncError");
const jwt = require('jsonwebtoken')
const User = require("../models/userModels")
exports.isAuthenticatedUser = catchAsyncErrors(async(req,res, next)=>{
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHander("please login to access this resource", 401));
    }
   

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
    


})