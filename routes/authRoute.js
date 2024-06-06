import express from 'express'
import {registerController} from '../controllers/authController.js'
import { loginController,testController } from '../controllers/authController.js';
import { requireSignIn ,isAdmin} from '../middlewares/authMiddleware.js';

//router object
const router=express.Router();

//routing
//register method post

router.post('/register',registerController)

//login routing using post method
router.post('/login',loginController)

//test routes
router.get('/test',requireSignIn,isAdmin,testController)

export default router