import React, { useState } from 'react'
import axios from 'axios'
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import FrontEndValidation from './FronEndValidation'
function Signup() {
  const navigate = useNavigate()
  //form validation normal+
  const [errors, setErrors] = useState({}); 
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

    const handleSubmit = (e) =>{
      e.preventDefault();
      const errs = FrontEndValidation(values)
      setErrors(errs)
      if(errors.name === "" && errors.email === "" && errors.password === "") {
      axios.post('http://localhost:3001/auth/signup',values )
       .then(res => {
       toast.success("Account Created Sucessfully", {
            position: "top-right",
            autoClose: 5000,
          })
          navigate('/login')
       })
       .catch(err => {
        console.log(err)
       })
      }
    
    }
 
  return (
    <div className="signup-container">
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
    <div className="formgroup"> 
       <label htmlFor="username">Username</label>
      <input
        type="text"
        onChange={handleChange}
        name="name"
        placeholder="Username"
      />
      {errors.name && <p>{errors.name}</p>}
      </div>
  
    <div className="formgroup">
    <label htmlFor="email">Email:</label>
      <input
        type="email"
        autoComplete="off"
        onChange={handleChange}
        name="email"
        placeholder="Email"
      />
      {errors.email && <p>{errors.email}</p>}
     
    </div>
      <div className="formgroup">
      <label htmlFor="password">Password</label>
      <input
        type="password"
        onChange={handleChange}
        name="password"
        placeholder="******"
      />
      {errors.password && <p>{errors.password}</p>}
      </div>

      {/* {
        serverErrors.length > 0 && (
          serverErrors.map((error, index) =>(
            <p className="error" key={index}>{error.msg}</p>
          ))
        )
      } */}

      <button type="submit">Sign Up</button>
      <p>
        Have an Account? <Link to="/login">Login</Link>
      </p>
    </form>
  </div>
  )
}

export default Signup


