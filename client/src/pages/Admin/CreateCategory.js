import React ,{useEffect,useState} from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'

import { toast } from 'react-toastify'
import axios from 'axios'
import CategoryForm from '../../Components/form/CategoryForm'
import {Modal}from 'antd'

const CreateCategory = () => {
  const [categories,setCategories]=useState([])
  const [loading,setloading]=useState(true)
  const[name,setName]=useState("")
  const [open,setOpen]=useState(false)
  const[selected,setSelected]=useState(null);
  const[updatedName,setUpdatedName]=useState("")

  //handle form
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      const {data}=await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`,{name})
      if (data?.success){
        toast.success(`${name} is created`)
        getAllCategory();
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('something went wrong in input form')
    }
  }
  //get all cat
  const getAllCategory=async()=>{
    try {
    
      const res=await axios.get(`${process.env.REACT_APP_API}/api/v1/category/getcategory`)
      if(res.data.success==true){
        setCategories(res.data.category)
        setloading(false)
        // console.log(res.data.category)
      }
     
    } catch (error) {
      console.log(error)
      toast.error('something is wrong in getting all category')
    }
  };
  useEffect(()=>{
    
  getAllCategory();
  },[])

    //update naame
const handleUpdate=async(e)=>{
  e.preventDefault();
  try {
    const {data}=await axios.put(`${process.env.REACT_APP_API}/api/v1/category//update-category/${selected._id}`,{name:updatedName})
    if(data.success){
      toast.success(`${updatedName} is updated`)
      setSelected(null)
      setUpdatedName("")
      setOpen(false)
      getAllCategory()
    }
    else{
      toast.error(data.message)
    }
  } catch (error) {
    console.log(error)
    toast.error('something went wrong in input form')
  }
}
//delete category
const handledelete=async(pId)=>{
  
  try {
    const {data}=await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`)
    if(data.success){
      toast.success("category is deleted")
     
     
      getAllCategory()
    }
    else{
      toast.error(data.message)
    }
  } catch (error) {
    console.log(error)
    toast.error('something went wrong in input form')
  }
}
  // if(loading){
  //   return <Spinner/>
  // }
  // if(!loading){
  console.log(typeof(categories))
  return ( <Layout title={"Dashboard- Create Category"}>
      <div className="container-fluid m-3 p-3" >
      <div className="row">
          <div className="col-md-3">
              <AdminMenu/>
          </div>
          <div className="col-md-9">
          <h1>Manage Category</h1>
          <div className="p-3 w-50">
            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
          </div>
          <div className="w-75">
          <table className="table">
    <thead>
      {/* {categories[0].name.toString()} */}
      <tr>

        <th scope="col">Name</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      
    {categories?.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <button className="btn btn-primary ml-2" onClick={()=>{setOpen(true);setUpdatedName(c.name);setSelected(c)}}>Edit</button>
                    
                      </td>
                      <td>    <button className="btn btn-danger ml-2"onClick={()=>{handledelete(c._id)}}>Delete</button></td>
                    </tr>
                  ))}
        
        {/* <td key={categories[0]._id}>{categories[0].name}</td> */}
    
  
    </tbody>
  </table>
  
          </div>
          <Modal onCancel={()=>setOpen(false)} footer={null} open={open}><CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/></Modal>
          </div>
  
    </div>
      </div>
  
  </Layout>
    )
  // }
}
export default CreateCategory
