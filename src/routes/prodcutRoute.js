const express = require('express');
const uploader = require('../middlewares/multerMiddleware');
const cloudinary = require('../config/cloudinaryConfig');
const { addProduct, getProduct, deleteProduct, getProducts } = require('../controllers/productController');
const { isLoggedIn, isAdmin } = require('../validation/authValidator');

const productRouter = express.Router();

productRouter.post(
    '/', 
    isLoggedIn, 
    isAdmin,  
    uploader.single('productImage'),  
    addProduct
);

productRouter.get('/:id', getProduct);

productRouter.get('/', getProducts);
productRouter.delete('/:id', deleteProduct);

module.exports = productRouter;
