import React from 'react'
import Layout from '../../Components/Layout/Layout'
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import '../../styles/Authstyles.css';
import { useState } from 'react';


const ForgotPassword = () => {
    
  const [email, setEmail] = useState();
  const [newPassword, setNewPassword] = useState();
  const [answer, setAnswer] = useState();
 
  const navigate= useNavigate();
  
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      //handel api request
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        {  email, newPassword,answer }
      );
      if(res && res.data.success){
        toast.success(res.data.message)
       
        navigate('/login')
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <Layout title={'Forgot-Password Ecommerce'}>
       
      <div className="form-container">
        
        <form onSubmit={handelSubmit}>
        <h4 className="title">Reset Password</h4>
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
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputanswer"
              placeholder="Your Best Friend?"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword"
              placeholder="Enter your password"
              required
            />
          </div>
         
          
          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword
