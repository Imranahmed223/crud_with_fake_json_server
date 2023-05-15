import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function SignUp() {
    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
const navigate = useNavigate()
const SIGN_UP=()=>{
    const user={
        username:username,
        email:email,
        password:password
    }
    console.log(user);
    axios.get('http://localhost:5000/users')
    .then((res) => {
    var info=res.data
    var found = info.find((element) => element.email === email);
    if(found){
      alert("User already register")
    }
    else{
      axios.post('http://localhost:5000/users',user)
      .then((res) => {
      alert("User added");
      navigate("/")
      setUsername("");
      setEmail("");
      setPassword("");
      })
      .catch((err) => {
        console.log(err);
        alert("Error adding user");
      });
    }
    })
}

  return (
    <div className='App'>
        <h1>SIGN IN PAGE</h1>
      <input type="text" style={{width:"30%"}} className="mt-2 App" placeholder="username" value={username} onChange={(e)=>{setUsername(e.target.value)}} aria-label="name"/>
      <br />
      <input type="email" style={{width:"30%"}} className="mt-2 App" placeholder="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} aria-label="email"/>
      <br />
      <input type="password" style={{width:"30%"}} className="mt-2 App" placeholder="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} aria-label="password"/>
      <br />
      <br />
      <button onClick={()=>{SIGN_UP()}}>Register</button>
    </div>
  )
}
