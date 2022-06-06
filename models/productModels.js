const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter product name"]
    },
    description:{
        type:String,
        required:[true, "Please enter description"]
    },
    price:{
        type:Number,
        required:[true, "please enter price"],
        maxlength:[8,"price cannot exceed 8 character"]
    },
    rating:{
        type:Number,
        default:0
    },
    image:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            
        },
    }, 
    category:{
        type:String,
        required:[true,'Please enter product category']
    },
    stock:{
        type:Number,
        required:[true, "Please enter product stock"],
        maxlength:[4, 'stock cannot exceed character 4']
    },
    numberofReview:{
        type:Number,
        default:0
    },
    review:[
        {
        name:{
            type:String,
            required:true,
        },
        rating:{
            type:Number,
            required:true,
        },
        comment:{
            type:String,
            required:true,
        }
}],
createdAt:{
    type:Date,
    default:Date.now
}

})


productSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}
module.exports = mongoose.model("Product", productSchema)

