const express = require('express');
const shortid = require('shortid');
const { createProduct, getProducts, getProductDetailsById, deleteProductById, getProductBySlug, updateProduct, getProduct, getAllProducts ,fileData} = require('../Controllers/ProductCtl');
const router = express.Router();
const app = express();
const path = require('path');
require('dotenv').config();
const Product = require("../Models/Product");
const { upload } = require('../middleware/MulterFile');
router.post("/product/create",createProduct );
router.get('/product/get', getProducts );
router.get('/product/getAll', getAllProducts );
router.get("/product/:productId", getProductDetailsById);
router.delete("/product/delete/:id",deleteProductById);
router.get("/product/get/:slug", getProductBySlug);
router.put('/product/files/:id',upload.array('productPictures', 5),fileData);



module.exports = router;