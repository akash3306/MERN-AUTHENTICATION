import React, { useState } from 'react'
import axios from 'axios'
import './Signup.css'
import {  useNavigate, useParams } from 'react-router-dom'

function ResetPassword() {
    const navigate = useNavigate()
    const [password, setPassword] = useState()
    const {token} = useParams() //takes parameter from url

    const handleSubmit = (e) =>{
      e.preventDefault();
      axios.post("http://localhost:3001/auth/reset-password/"+token, { 
        password,
      
      } )
      .then(response => {
        if(response.data.status){
        
            navigate('/login')
        }
       console.log(response.data)
       })
       .catch(err => {
        console.log(err)
       })
    
    }
 

  return (
    <div className='signup-container'>
     <form className='signup-form' onSubmit={handleSubmit}>
             <h2>Reset Password</h2>

             <label htmlFor="password">New Password</label>
        <input type="password"  onChange={(e)=>setPassword(e.target.value)} placeholder='******'/>
      
        <button type='submit'>Reset</button>
     
 </form> 
    </div>
  )
}

export default ResetPassword



