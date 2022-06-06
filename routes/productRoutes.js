const express = require("express");
const {getAllProduct, createProduct, updateProduct,deleteProduct, getProductDetail } = require("../controller/productController");
const router = express.Router();



router.route("/product").get(getAllProduct);
router.route("/product/new").post(createProduct);
router.route("/product/:id")
.put(updateProduct)
.delete(deleteProduct)
.get(getProductDetail)



module.exports = router;