import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import classes from './Login.module.css'
import revealPassIcon from '../icons/revealPassIcon.png';
import hidePassIcon from '../icons/hidePassIcon.png';
import { useUser } from "../context/UserContext";
import api from "../api/api";

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate()
  const { updateUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    
    try {
      const response = await api.post("/login", { email, password });
      const { user, accessToken, refreshToken } = response.data;
  
      if (user && accessToken) {
        updateUser({ ...user, accessToken });
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setEmail("");
        setPassword("");
        navigate('/');
      } else {
        setErrMsg("Login Failed: Missing user data or access token");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setErrMsg("Login Error: " + (err.response?.data?.message || "An unexpected error occurred"));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.container}>  
      <h1>Log In</h1>
      <p>Don't have an account? <Link to='/register'>Register Here</Link></p>
      <input 
        type="email" 
        placeholder="Email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <div className={classes.passwordContainer}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
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
      <p>Forgot password? <Link to="/forgot-password">Click here</Link></p>
      <button className={classes.loginBttn} type="submit">Log in</button>
      {errMsg && <p className={classes.error}>{errMsg}</p>}
    </form>
  )
}

export default Login

