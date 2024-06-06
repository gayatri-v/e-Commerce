import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken';

export const registerController =async(req,res)=>{
    try {
        const {name,email,password,phone,address}=req.body
        //validation
        if(!name){
            return res.send({message:'name is required'})
        }
        if(!email){
            return res.send({message:'email is required'})
        }
        if(!password){
            return res.send({message:'password is required'})
        }
        if(!phone){
            return res.send({message:'phone is required'})
        }
        if(!address){
            return res.send({message:'address is required'})
        }
        //check user
        const existinguser=await userModel.findOne({email})
        //existing user
        if (existinguser){
            return res.status(200).send({
                success:false,
                message:'Already Registered please login'
            })
        }
        //register user
        const hashedPassword=await hashPassword(password)

        // save
        const user = await new userModel({name,email,phone,address,password:hashedPassword}).save()

        res.status(201).send({
            success:true,
            message:"user registered successfully",
            user,
           
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in Registration',
            error
        })
    }

};

//login
export const loginController=async(req,res)=>{
   try {
    const {email,password}=req.body
    //validation
    if(!email || !password){
        return req.status(404).send({
            success:false,
            message:'Invalid email or password'
        })
    }
    //check user
    const user=await userModel.findOne({email})
    if(!user){
        return req.status(404).send({
            success:false,
            message:'Invalid user'
        })
    }
    const match =await comparePassword(password,user.password)
    if(!match){
        return req.status(200).send({
            success:false,
            message:'Invalid password'
        })
    }

    //token
    console.log('user login successfully');
    const token= await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
    res.status(200).send({
        success:true,
        message:'Login Successfully',
    
        user:{
          name:user.name,
          email:user.email,
          address:user.address,
          phone:user.phone,
          token
        }
    })
   } catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
            message:'error in login',
            error
    })
   }
}

//test 
export const testController=(req,res)=>{
try {
    res.send('protected routes');
} catch (error) {
   console.log(error)
   res.send(error); 
}
}