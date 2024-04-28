import React, { useState } from 'react'
import axios from 'axios'
import './Signup.css'
import {  useNavigate } from 'react-router-dom'

function ForgotPassword() {
    const navigate = useNavigate()
    const [email, setEmail] = useState()

    const handleSubmit = (e) =>{
      e.preventDefault();
      axios.post("http://localhost:3001/auth/forgot-password",{ 
        email,
      
      } )
      .then(response => {
        if(response.data.status){
            alert("Check your Email for reset  password link")
            navigate('/login')
        }
       
       })
       .catch(err => {
        console.log(err)
       })
    
    }
 

  return (
    <div className='signup-container'>
     <form className='signup-form' onSubmit={handleSubmit}>
             <h2>Forgot Password</h2>

        <label htmlFor="email">Email:</label>
        <input type="email" onChange={(e)=> setEmail(e.target.value)}name = "email" placeholder='Email'/>
      
        <button type='submit'>Send</button>
     
 </form> 
    </div>
  )
}

export default ForgotPassword


