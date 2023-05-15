import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Routes, Route} from "react-router-dom";
import Content from './Content';


export default function Login() {
const [loginemail,setLoginEmail]=useState("")
const [loginpwd,setLoginPwd]=useState("")
const navigate=useNavigate()
const LOG_IN=()=>{
    const user={
    loginemail:loginemail,
    loginpwd:loginpwd
    }
    console.log(user);
    axios.get('http://localhost:5000/users')
    .then((res) => {
        var info=res.data
        var found = info.find((element) => element.email === loginemail && element.password === loginpwd);
        if (found) {
            const USER_NAME=found.username
            console.log(found.username);
            navigate('/content')
          }
          else{
            alert("Enter valid email and password")
          }
        setLoginEmail('')
        setLoginPwd("")
    })
    .catch((err) => {
      console.log(err);
      alert("Log in failed due to server");
    });
}
const REG=()=>{
    navigate('/signup')
}
  return (
<div className='App'>
<h1>LOG IN PAGE</h1>
  <input type="email" style={{width:"30%"}} className="mt-2 App" placeholder="email" value={loginemail} onChange={(e)=>{setLoginEmail(e.target.value)}} aria-label="loginemail"/>
  <br />
  <input type="password" style={{width:"30%"}} className="mt-2 App" placeholder="password" value={loginpwd} onChange={(e)=>{setLoginPwd(e.target.value)}} aria-label="loginpwd"/>
  <br />
  <br />
  <button onClick={()=>{LOG_IN()}}  className="mx-4">LOGIN</button>
  <button onClick={()=>{REG()}}>REGISTER</button>
</div>
  )
}
