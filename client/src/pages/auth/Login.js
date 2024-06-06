import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import '../../styles/Authstyles.css';
import { useAuth } from "../../context/Auth";
const Login = () => {
   const [auth,setAuth]=useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const navigate= useNavigate('');

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      //handel api request
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        {  email, password }
      );
      if(res.data.success){
        toast.success(res.data.message)
        setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token,
        });
        localStorage.setItem('auth',JSON.stringify(res.data))
        navigate('/')
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <Layout title={"Register - Ecommerce app"}>
      <div className="form-container">
        <h4 className="title">Login page</h4>
        <form onSubmit={handelSubmit}>
         
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter your email"
              required
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
              required
            />
          </div>
         
          
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Login
