import React,{useState,useEffect} from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'
import { useAuth } from '../../context/Auth'
import { toast } from 'react-toastify'
import axios from 'axios'
const Profile = () => {
  //context
  const[auth,setAuth]=useAuth()
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  
  //get user data
  useEffect(()=>{
    const{email,name,phone,address}=auth?.user
    setName(name)
    setPhone(phone)
    setEmail(email)
    setAddress(address)
  },[auth?.user])
    //submit handle buttton
    const handelSubmit = async (e) => {
      e.preventDefault();
      try {
        //handel api request
        const {data} = await axios.put(
          `${process.env.REACT_APP_API}/api/v1/auth/profile`,
          { name, email, password, phone, address }
        );
       if(data?.error){
        toast.error(data?.error)
       }else{
        setAuth({...auth,user:data?.updatedUser})
        let  ls=localStorage.getItem('auth')
        ls=JSON.parse(ls)
        ls.user=data.updatedUser
        localStorage.setItem('auth',JSON.stringify(ls))
        toast.success('profile updated successfully')
       }
      } catch (error) {
        console.log(error.response.data);
      
        toast.error("something went wrong");
      }
    };
    
  return (
    <Layout title={'Your Profile'}>
    <div className="container-fluid p-3 m-3">
      <div className="row">
          <div className="col-md-3">
              <UserMenu/>
          </div>
          <div className="col-md-9">
          <div className="form-container">
        <h4 className="title">USER PROFILE</h4>
        <form onSubmit={handelSubmit}>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputName"
              placeholder="Enter Your Name"
             
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter your email"
           
              disabled
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword"
              placeholder="Enter your password"
              
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputPhone"
              placeholder="Enter your Number"
          
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputAddress"
              placeholder="Enter your Address"
           
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
           UPDATE
          </button>
        </form>
      </div>
          </div>
      </div>
    </div>
  </Layout>
  )
}

export default Profile
