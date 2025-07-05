const cloudinary = require('../config/cloudinaryConfig');
const ProductRepository = require('../repositories/productRepository');

const fs = require('fs/promises');
const InternalServerError = require('../utils/internalServerError');
const NotFoundError = require('../utils/notFoundError');
const BadRequestError = require('../utils/badRequestError');
const {getAllProducts} = require('../repositories/productRepository');


async function createProduct(productDetails){
    // 1. we should check if an image is coming tp create the product , then we should upload it to cloudinary

    const imagePath = productDetails.imagePath;
    if(imagePath){
        try{
            const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
            var productImage = cloudinaryResponse.secure_url;

            console.log(productImage);

            await fs.unlink(process.cwd() + '/' + imagePath); 
        }
        catch(error){
            console.log(error);
            throw new InternalServerError();
        }
    }


    //2. then use the url from cloudinary and other product details to add produt in db


        const product = await ProductRepository.createProduct({
            ...productDetails,
            productImage: productImage
         });

         console.log(product);
         
        return product;
  
    

}

async function getProductById(productId){
    const response = await ProductRepository.getProductById(productId);
    if(!response){
        throw new NotFoundError('Product');
    }   

    return response;
}


async function getAllProductsData(){
    const response = await ProductRepository.getAllProducts();
    if(!response){
        throw new NotFoundError('Product');
    }   

    return response;
}



async function deleteProductById(productId){
    const response = await ProductRepository.deleteProductById(productId);
    if(!response){
        throw NotFoundError('Product');
    }   

    return response;
}




module.exports = {
    createProduct, 
    getProductById, 
    deleteProductById,
    getAllProductsData
}