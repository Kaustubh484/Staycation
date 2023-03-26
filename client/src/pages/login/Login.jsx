import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
 const Login=()=>{
const[credentials,setCredentials]=useState({
    username:"",
    password:""
})
const {user,loading,error,dispatch} =useContext(AuthContext)
const handleChange=(e)=>{
  setCredentials((prev)=>({
    ...prev,
    [e.target.id]:e.target.value
  }
  ))
}

const handleClick=async(e)=>{
e.preventdefault();
dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login",
       credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
    console.log(user)
}
return(
    <div className="login">
      <input type="text" id="username" placeholder="username" onChange={handleChange}className="username" />
      <input type="text" id="password" placeholder="password" onChange={handleChange}className="password" />
       <button className="submit" onClick={handleClick}>Login</button>
    </div>
)

}
export default Login