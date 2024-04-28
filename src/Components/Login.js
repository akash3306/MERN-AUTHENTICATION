
import React, { useState } from 'react'
import axios from 'axios'
import { toast } from "react-toastify";
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
const navigate = useNavigate()
const [values, setValues] = useState({
  email: "",
  password: "",
});
const handleChange = (e) => {
  setValues({ ...values, [e.target.name]: e.target.value });
};

//after configuring cors for cookie
axios.defaults.withCredentials = true;

    const handleSubmit = (e) =>{
      e.preventDefault();
      axios.post('http://localhost:3001/auth/login',values )
      .then(response => {
       if(response.data.status){
        toast.success("Login Sucessfull", {
          position: "top-right",
          autoClose: 5000,
        })
        navigate('/')
       }
       })
       .catch(err => {
        console.log(err)
       })
    
    }
 

  return (
    <div className='signup-container'>
     <form className='signup-form' onSubmit={handleSubmit}>
             <h2>Login</h2>

        <label htmlFor="email">Email:</label>
        <input type="email"  onChange={handleChange} name = "email" placeholder='Email'/>
      
        <label htmlFor="password">Password</label>
        <input type="password"  onChange={handleChange} name = "password" placeholder='******'/>
        
        
        <button type='submit'>Sign Up</button>
       <Link to='/forgotPassword'>Forgot Password?</Link>
        <p>Don't have an Account?  <Link to= '/signup'>Sign up</Link></p>
 </form> 
    </div>
  )
}

export default Login


