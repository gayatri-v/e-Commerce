import CategoryModel from "../models/CategoryModel.js"
import slugify from "slugify"
export const createCategoryController=async(req,res)=>{
try {
    const {name}=req.body
    if(!name){
       return res.status(401).send({message:'Name is required'})
    }
    const existingCategory=await CategoryModel.findOne({name})
    if(existingCategory){
        return res.status(200).send({
            success:true,
            message:'Category already exists'
        })
    }
    const category=await new CategoryModel({name,slug:slugify(name)}).save()
    
    res.status(201).send({
        success:true,
        message:'new category created',
        category,
    })
} catch (error) {
    console.log(error),
    res.status(500).send({
        success:false,
        error,
        message:'error in category'
    })
}
}

//update 
export const updateCategoryController=async(req,res)=>{
   try {
    const {name}=req.body
    const {id} =req.params
    const category =await CategoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
    res.status(200).send({
        success:true,
        message:'Category updated successfully',
        category
    })
   } catch (error) {
    console.log(error)
    return res.status(500).send({
        success:false,
        error,
        message:'error while updating category'
    })
   }
}
//get category
export const categoryController=async(req,res)=>{
    try {
        const category=await CategoryModel.find({})
        return res.status(200).send({
            success:true,
            message:'all category list',
            category,
        })
    } catch (error) {
        console.log(error)
    return res.status(500).send({
        success:false,
        error,
        message:'error while getting all category'
    }) 
    }
}

//single category
export const singleCategoryConteoller=async(req,res)=>{
try {
 
    const category=await CategoryModel.findOne({slug:req.params.slug})
    res.status(200).send({
        success:true,
        message:"get single category succesffully",
        category
    })
    
} catch (error) {
    console.log(error)
    return res.status(500).send({
        success:false,
        error,
        message:'error while getting single category'
    }) 
}
}

//delete category
export const deleteCategoryController=async(req,res)=>{
    try {
        const {id}=req.params
        await CategoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:" category deleted succesffully",
            
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            error,
            message:'error while deleting category'
        }) 
    }
}