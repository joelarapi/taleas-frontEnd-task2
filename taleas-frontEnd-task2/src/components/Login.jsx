import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import classes from './Login.module.css'

const Login = () => {

  const [email , setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, 
        }
      );
  

      const userData = response?.data?.user;
  
      if (userData) {
        localStorage.setItem("accessToken", response?.data?.accessToken);
        localStorage.setItem("isAdmin", userData.isAdmin); 

        setEmail("");
        setPassword("");
        navigate('/');
      } else {
        setErrMsg("Login Failed");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setErrMsg("Login Error: " + (err.response?.data?.message || "An unexpected error occurred"));
    }
  };
  


  return (
    <form onSubmit={handleSubmit} className={classes.container}>  
    <h1>Log In</h1>

    <p>Dont have an account ? <Link to='/register'>Register Here</Link></p>
    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>

    <p>Forgot password ? <a>Click here</a></p>
    <button> Log in </button>
    </form>
  )
}

export default Login