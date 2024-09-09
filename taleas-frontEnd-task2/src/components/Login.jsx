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
        { email: email, password }, 
  
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, 
        }
      );
  

      const userData = response?.data?.user;
      if (userData) {
        localStorage.setItem("userData", JSON.stringify(userData));
  
        setEmail("");
        setPassword("");
  
        if (userData.isAdmin) {
          navigate("/dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        setErrMsg("Login Failed");
      }
    } catch (err) {
      console.error("Login Error:", err);
      console.error(err.response);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.container}>  
    <h1>Log In</h1>

    <p>Dont have an account ? <Link>Register Here</Link></p>
    <input type="email" placeholder="Email"/>
    <input type="password" placeholder="Password"/>
    <button> Log in </button>
    </form>
  )
}

export default Login