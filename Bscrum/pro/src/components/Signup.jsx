import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from './componts.module.css';

function Signup() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [no, setNo] = useState();

  const signUpHere = ()=>{
      let _data = {
        name: name,
        number: no,
        email: email,
        password: password
      };
      fetch("http://localhost:8000/auth/signup", {
        method: "POST",
        body: JSON.stringify(_data),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((err) => console.log(err));
  }

  return (
    <div className={styled.border}>
      <input type="text"
        placeholder='Name'
        onChange={(e)=>setName(e.currentTarget.value)}  
      />
      <br/>
      <input type="tel"
        placeholder='Mobile No'
         onChange={(e)=>setNo(e.currentTarget.value)}  
      /> 
      <br/>
      <input type="email"
        placeholder='Email'
         onChange={(e)=>setEmail(e.currentTarget.value)}  
      />
      <br/>
      <input type="password"
        placeholder='Password'
         onChange={(e)=>setPassword(e.currentTarget.value)}  
      />  
      <br/>
      <input type='submit'
        value='SIGNUP'
        onClick={signUpHere}
      />
      <Link to='/'>Login</Link>
      {/* <Link to='/auth/google'>SignUp With Google</Link> */}
    </div>
  )
}
export default Signup