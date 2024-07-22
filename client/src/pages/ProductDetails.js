import React ,{useState,useEffect}from 'react'
import Layout from '../Components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const ProductDetails = () => {
    const params=useParams();
    const[products,setProducts]=useState({})
    const[relatedproducts,setRelatedProducts]=useState([])
    //initial details
    useEffect(()=>{
if(params?.slug){
    getProduct()
}
    },[params?.slug])
    //get product
    const getProduct=async()=>{
        try {
          const{data} =await axios.get(
            `${process.env.REACT_APP_API}/api/v1/product/single-product/${params.slug}`
          ); 
          
          setProducts(data.products)
          getSimilarProduct(data.products._id,data?.products.category._id)
        } catch (error) {
           console.log(error) 
        }
    }

    //get similar product
    const getSimilarProduct=async(pid,cid)=>{
        try {
            const {data}=await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
              );
              setRelatedProducts(data?.products) 
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Layout>
      
    <div className="row container mt-2">
        <div className="col-md-6">
        <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${products._id}`}
                    className="card-img-top"
                    alt={products.name}
                    height="300"
                    width={'350px'}
                  />
        </div>
        <div className="col-md-6 ">
            <h1 className='text-center'>Product Details</h1>
              <h6> Name: {products.name}</h6>
              <button className="btn btn-primary ms-1">Add to Cart</button>
        </div>
    </div>
    <hr />
    <div className="row container"> 
        <h6>similar product</h6>
        {relatedproducts.length<1&&(<p className='text-center'>No Similar Products found</p>)}
        <div className="d-flex flex-wrap">
            {relatedproducts?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text">${p.price}</p>
                 
                  <button className="btn btn-primary ms-1">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
    </div>
    </Layout>
  )
}

export default ProductDetails
