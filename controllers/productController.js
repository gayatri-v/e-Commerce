import slugify from "slugify"
import ProductModel from "../models/ProductModel.js"
import fs from 'fs'
import { PiRowsDuotone } from "react-icons/pi"

export const createProductController=async(req,res)=>{
try {
    const {name,slug,description,price,category,quantity,shipping}=req.fields
    const{photo}=req.files

    //validation
     switch(true){
        case !name:
            return res.status(500).send({error:'Name is required'})
        case !description:
            return res.status(500).send({error:'Discription is required'})
        case !price:
            return res.status(500).send({error:'Price is required'})
        case !category:
            return res.status(500).send({error:'category is required'})
        case !quantity:
            return res.status(500).send({error:'Quantity is required'})
        case !photo && photo.size >1000000:
            return res.status(500).send({error:'photo is required and should be less than 1 mb'})
       
     }

    const products=new ProductModel({...req.fields,slug:slugify(name)})
    if(photo){
        products.photo.data=fs.readFileSync(photo.path)
        products.photo.contentType=photo.type
    }
    await products.save()
    res.status(201).send({
        success:true,
        message:'product created successfully',
        products
    })
} 
catch (error) {
    console.log(error)
    return res.status(500).send({
        success:false,
        message:"error in the product creation",
        error,
    })
}
}

//get all product

export const getProductController=async(req,res)=>{
try {
    const products=await ProductModel.find({}).populate('category').select('-photo').limit(12).sort({createdAt:-1})
    res.status(200).send({
        success:true,
        counTotal:products.length,
        message:"all products are got successfully",
        products,
      
    })
} catch (error) {
    console.log(error)
    return res.status(500).send({
        success:false,
        message:"Error in getting all products",
        error:error.message,
    })
}
}

//get single product

export const getSingleProductController=async(req,res)=>{
try {
    const products =await ProductModel.findOne({slug:req.params.slug}).select('-photo').populate('category')
    res.status(200).send({
        success:true,
       
        message:"single product is fetch successfully",
        products,
    })
    
} catch (error) {
    console.log(error)
    return res.status(500).send({
        success:false,
        message:"Error in getting single products",
        error
    })
}
}

//get photo
export const productPhotoController=async(req,res)=>{
try {
    const products=await ProductModel.findById(req.params.pid).select('photo')
    if(products.photo.data){
        res.set('Content-type',products.photo.contentType)
        return res.status(200).send(products.photo.data)
    }
} catch (error) {
    console.log(error)
    return res.status(500).send({
        success:false,
        message:"Error in getting phtoto products",
        error
    })
}
}

//delete
export const deleteProductController=async(req,res)=>{
    try {
        await ProductModel.findByIdAndDelete(req.params.pid).select('-photo');
        res.status(200).send({
            success:true,
           
            message:"product deleted successfully",
            
        })
    } catch (error) {
        console.log(error)
    return res.status(500).send({
        success:false,
        message:"Error in deleting products",
        error
    })
    }

}

//update
export const updateProductController=async(req,res)=>{
    try {
        const {name,slug,description,price,category,quantity,shipping}=req.fields
        const{photo}=req.files
    
        //validation
         switch(true){
            case !name:
                return res.status(500).send({error:'Name is required'})
            case !description:
                return res.status(500).send({error:'Discription is required'})
            case !price:
                return res.status(500).send({error:'Price is required'})
            case !category:
                return res.status(500).send({error:'category is required'})
            case !quantity:
                return res.status(500).send({error:'Quantity is required'})
            case !photo && photo.size >1000000:
                return res.status(500).send({error:'photo is required and should be less than 1 mb'})
           
         }
    
        const products=await ProductModel.findByIdAndUpdate(req.params.pid,
            {...req.fields,slug:slugify(name)},{new:true}
        )
        if(photo){
            products.photo.data=fs.readFileSync(photo.path)
            products.photo.contentType=photo.type
        }
        await products.save()
        res.status(201).send({
            success:true,
            message:'product updated successfully',
            products
        })
    } 
    catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"error in the product creation",
            error,
        })
    }
    }