import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken';

export const registerController =async(req,res)=>{
    try {
        const {name,email,password,phone,address,answer}=req.body
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
        if(!answer){
            return res.send({message:'answer is required'})
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
        const user = await new userModel({name,email,phone,address,password:hashedPassword,answer}).save()

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
            _id:user._id,
          name:user.name,
          email:user.email,
          address:user.address,
          phone:user.phone,
          role:user.role,
          
        },
        token,
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

//forgot passwowrd

export const forgotPasswordController=async(req,res)=>{
try {
    const {email,answer,newPassword}=req.body
    if(!email){
        res.status(400).send({message:'Email is required'})
    }
    if(!answer){
        res.status(400).send({message:'Answer is required'})
    }
    if(!newPassword){
        res.status(400).send({message:'New Password is required'})
    }
    //check email or ans
    const user=await userModel.findOne({email,answer})
    //validation
    if(!user){
        return res.status(400).send({
            success:false,
            message:'wrong email or answer'
        })
    }
   const hashed= await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id,{password:hashed})
    res.status(200).send({
        success:true,
        message:'password reset successfully'
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Something went wrong',
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

//dashboard

export const sendOk=(req,res)=>{
  return  res.status(200).send({ok: true});
} 