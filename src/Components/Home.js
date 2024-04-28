import React from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './Signup.css'
const Home = () => {
  //logout
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  const handleLogout = () =>{
    axios.get('http://localhost:3001/auth/logout')
    .then(res => {
      if(res.data.status){
        navigate('/login')
      }
    }).catch(err =>{
      console.log(err)
    })
  }
  return (
    <div className='home'>
     <h1>Home</h1>
     <div className="buttons">
     <button><Link to= "/dashboard">Dasboard</Link></button>
     <button><Link to= "/signup">Signup</Link></button>
      <button onClick={handleLogout}>Logout</button>
     </div>
     
    </div>
  )
}

export default Home