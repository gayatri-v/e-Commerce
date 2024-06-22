import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController, updateProductController } from '../controllers/productController.js';

import formidable from 'express-formidable';
const router=express.Router();

//routes

router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)
//get all products
router.get('/get-Product',getProductController)

//get single product
router.get('/single-product/:slug',getSingleProductController)

//get photo
router.get('/product-photo/:pid',productPhotoController)

//delete product
router.delete('/delete-product/:pid',deleteProductController)

//update product
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController)
export default router