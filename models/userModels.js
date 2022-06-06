const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "please inter your name"],
        maxlength:[30, "Name cannot exceed 30 character"],
        minlength:[3, "Name should have more than 3 character"]
    },
    email:{
        type:String,
        required:[true, "Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"please Enter a valid email"]
    },
    password:{
        type:String,
        required:[true, "Please enter your password"],
        minlength:[8, "password should be greater than 8 character"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            
        },
    },
    role:{
        type:String,
        default:"user"
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date,
})




userSchema.pre("save", async function(next){
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
})


// JWT TOKEN
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

// compare password

userSchema.methods.comparePassword = async function (enterPassword){
    return bcrypt.compare(enterPassword, this.password)
}

// generating password Reset token

userSchema.methods.getResetPasswordToken = function(){
  const resetToken = crypto.randomBytes(20).toString("hex");

  // hashing and add to userSchema
  this.resetPasswordToken = crypto
  .createHash("sha256")
  .update(resetToken)
  .digest("hex");

  this.resetPasswordExpire = Date.now() +15 *60 * 1000;
  return resetToken;
}


module.exports = mongoose.model("User", userSchema)