import React ,{useEffect,useState} from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'

import { toast } from 'react-toastify'
import axios from 'axios'
const CreateCategory = () => {
  const [categories,setCategories]=useState([])
  const [loading,setloading]=useState(true)
  //get all cat
  const getAllCategory=async()=>{
    try {
    
      const res=await axios.get(`${process.env.REACT_APP_API}/api/v1/category/getcategory`)
      if(res.data.success==true){
        setCategories(res.data.category)
        setloading(false)
        console.log(res.data.category)
      }
     
    } catch (error) {
      console.log(error)
      toast.error('something is wrong in getting all category')
    }
  }
  useEffect(()=>{
    if(!loading){
      <Layout title={"Dashboard- Create Category"}>
      <div className="container-fluid m-3 p-3" >
      <div className="row">
          <div className="col-md-3">
              <AdminMenu/>
          </div>
          <div className="col-md-9">
          <h1>Manage Category</h1>
          <div>
          <table className="table">
    <thead>
      <tr>
  
        <th scope="col">Name</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        {categories.map((c)=>{
          <td key={c._id}>{c.name}</td>
        })}
      </tr>
  
    </tbody>
  </table>
  
          </div>
          </div>
  
    </div>
      </div>
  
  </Layout>
    
  }
  getAllCategory();
  },[])
  
}
export default CreateCategory
