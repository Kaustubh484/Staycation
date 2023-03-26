import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"

const Login=()=>{
const[credentials,setCredentials]=useState({
    username:"",
    password:""
})
const {user,loading,error,dispatch} =useContext(AuthContext)
const handleChange=(e)=>{
  setCredentials((prev)=>({
    ...prev,
    [e.target.name]:e.target.name
  }
  ))
}

const handleClick=async(e)=>{
e.preventdefault();
dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }

}
return(
    <div className="login">
      <input type="text" placeholder="username" onChange={handleChange}className="username" />
      <input type="text" placeholder="password" onChange={handleChange}className="password" />
       <button className="submit" onClick={handleClick}>Login</button>
    </div>
)

}