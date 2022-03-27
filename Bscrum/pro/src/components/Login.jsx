import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import  styled  from './componts.module.css';
function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [accessToken, setAccessToken] = useState('');
  const navigate = useNavigate();

  if (accessToken) {
    navigate('/Home');
  }
  
  const LoginHere = ()=>{
      let _data = {
        email: email,
        password: password
      };
      fetch("http://localhost:8000/auth/login", {
        method: "POST",
        body: JSON.stringify(_data),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => {
          if (!response.ok) {
            return alert('Email or password is wrong.')
          }
          return response.json();
        })
        .then((json) => setAccessToken(json.token))
  }

  return (
    <div className={styled.border}>
      <input
      type="email" 
      placeholder='Email' 
      onChange={(e)=>setEmail(e.currentTarget.value)}  
      />
      <br/>
      <input 
      type="password" 
      placeholder='Password' 
      onChange={(e)=>setPassword(e.currentTarget.value)}    
      />   
      <br/>
      <input 
      type='submit' 
      value='LOGIN'
      onClick = {LoginHere}
      />  
      <Link to='signup'>SignUp</Link>
    </div>
  )
}

export default Login