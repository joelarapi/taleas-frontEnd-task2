import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import classes from './Register.module.css'

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrMsg("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/user',
        { userName, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      if (response.status === 201) {
        navigate('/login');
      } else {
        setErrMsg("Registration Failed");
      }
    } catch (err) {
      console.error("Registration Error:", err);
      setErrMsg("Registration Error: " + (err.response?.data?.message || "An unexpected error occurred"));
    }
  };

  return (
    <div className={classes.container}>
      <h1>Sign Up</h1>
      {errMsg && <p style={{ color: 'red' }}>{errMsg}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>User Name:</label>
          <input 
            type="text" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
