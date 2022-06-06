const Product = require("../models/productModels");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ErrorHander = require("../utils/errorhandler");
const sendToken = require("../utils/jwtToken");
const ApiFeature = require("../utils/apifeature")

// create a product admin
exports.createProduct = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.create(req.body);
    sendToken(product,201, res);
})

// all user can view
exports.getAllProduct = catchAsyncErrors(async(req,res,next)=>{

 
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();

    const apifeature = new ApiFeature(Product.find(),req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
    const product = await apifeature.query;
        res.status(200).json({
            status:true,
            data:product,
            productCount:productCount
        })
})



exports.getProductDetail = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHander("product not found", 401))
    }

    
    res.status(200).json({
        status:true,
        message:"product detail",
        data:product
    })
})


// update product admin

exports.updateProduct = catchAsyncErrors(async(req,res,next)=>{
    const id = req.params.id;
    let product = await Product.findById(id);

    if(!product){
        return next(new ErrorHander("product not found",500))
    }

    product = await Product.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        userFindAndModify:false
    })
    res.status(200).json({
        status:true,
        data:product
    })

})


// admin delete product 

exports.deleteProduct = catchAsyncErrors( async (req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHander("product not found", 401))
    }

    await product.remove();
    res.status(200).json({
        status:true,
        message:"product deleted successfully"
    })
})