import React,{useState,useEffect} from 'react'
import Layout from '../Components/Layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const CategoryList = () => {
    const [products,setProducts]=useState([])
    const [category,setCategory]=useState([])
    const params=useParams();
    const getProductByCat=async()=>{
        try {
            const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
     if(params?.slug){
        getProductByCat();
     }
    },[params?.slug])
  return (
    <Layout>
   <div className="container">
    <h1 className='text-center mt-3'>{category?.name}</h1>
   </div>
    </Layout>
  )
}

export default CategoryList
