import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import classes from './Login.module.css'
import revealPassIcon from '../icons/revealPassIcon.png';
import hidePassIcon from '../icons/hidePassIcon.png';
import { useUser } from "../context/UserContext";


const Login = () => {

  const [email , setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate()
  const { updateUser } = useUser();
 


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
  
      const { accessToken, user } = response.data;
  
      if (user) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userId", user.id); 
        localStorage.setItem("isAdmin", user.isAdmin);

        updateUser(user); 
        
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
   
    <div className={classes.passwordContainer}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button
          type="button"
          onClick={() => setShowPassword(prevState => !prevState)}
          className={classes.eyeIcon}
        >
          <img
            src={showPassword ? hidePassIcon : revealPassIcon}
            alt="Toggle password visibility"
          />
        </button>
      </div>

    <p>Forgot password ? <a>Click here</a></p>
    <button className={classes.loginBttn}> Log in </button>
    {errMsg && <p className={classes.error}>{errMsg}</p>}
    </form>
  )
}

export default Login