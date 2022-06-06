const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModels");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js")

// registerUser
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const {name, email, password} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"this is a sample id",
            url:'profilepicUrl',
        }
    });

    sendToken(user,201, res);
})


// login user

exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return next(new ErrorHander("please enter email and password ", 400))
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHander("Invalid email or password", 401))
    }
    const isPasswordMatch = await user.comparePassword(password);

    if(!isPasswordMatch){
        return next(new ErrorHander("Invalid email or passowwrd", 401))
    }

    sendToken(user,200, res);
})


// Logout User

exports.logout = catchAsyncErrors(async(req,res,next)=>{

 res.cookie('token', null,{
     expires:new Date(Date.now()),
     httpOnly:true,
 });

    res.status(200).json({
        success:true,
        message:"Logged OUt",
    })
})



// ForgotPassword

exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHander("message email doesn't exit", 404));
    }
// Get ResetPassowrd Token
 const resetToken = user.getResetPasswordToken();
 await user.save({validateBeforeSave: false});

 const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

 const message = `Your password reset token is :-\n\n${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it`;

 try{
    await sendEmail({
        email:user.email,
        subject:`ecommerce password recovery`,
        message,
    })
    res.status(200).json({
        success:true,
        message:`Email sent to ${user.email} successfulyy`,
    })
 }
 catch(error){
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save({validateBeforeSave:false});

  return next(new ErrorHander(error.message, 500))
 }
})


