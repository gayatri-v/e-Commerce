import express from 'express'
import {registerController, loginController,testController ,forgotPasswordController, sendOk, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController} from '../controllers/authController.js';
import { requireSignIn ,isAdmin} from '../middlewares/authMiddleware.js';

//router object
const router=express.Router();

//routing
//register method post

router.post('/register',registerController)

//login routing using post method
router.post('/login',loginController)

//forgot password
router.post('/forgot-password',forgotPasswordController)

//test routes
router.get('/test',requireSignIn,isAdmin,testController)

//protected route auth
router.get('/user-auth',requireSignIn,sendOk)

//admin dashboard protected route
router.get('/admin-auth',requireSignIn,isAdmin,sendOk)

//update profile
router.put('/profile',requireSignIn,updateProfileController)

//orders
router.get('/orders',requireSignIn,getOrdersController)

//all orders
router.get('/all-orders',requireSignIn,isAdmin,getAllOrdersController)

//order update
router.put('/order-status/:orderId',requireSignIn,isAdmin,orderStatusController)
export default router