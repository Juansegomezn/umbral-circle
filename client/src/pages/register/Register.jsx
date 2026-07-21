import { Link, useNavigate } from 'react-router-dom'
import './register.scss'
import { useState } from 'react';
import { makeRequest } from '../../axios';
import CircularProgress from '@mui/material/CircularProgress';

export const Register = () => {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    name: ''
  });
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if(err) setErr(null);
  };
  
  const handleRegister = async (e) => {
    e.preventDefault();

    if (Object.values(inputs).some(value => value.trim() === "")) {
      return setErr("All fields are required.");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email)) {
      return setErr("Please enter a valid email address.");
    }
    if (inputs.password.length < 8) {
      return setErr("Password must be at least 8 characters long.");
    }

    setLoading(true);
    try {
      await makeRequest.post('/auth/register', inputs);
      navigate('/login');
    } catch (err) {
      setErr(err.response?.data || 'An error occurred during registration. Please try again.');
      setLoading(false);
    }
  }
  
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Step into the Circle</h1>
          <p>
            The threshold to a new creative space is just one step away. 
            Create your account to start sharing your world with us.
          </p>
          <span>Already have an account?</span>
          <Link to="/login" style={{width:'60%'}}>
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleRegister}>
            <input 
              type="text" 
              placeholder='Username' 
              name='username' 
              onChange={handleChange} 
              disabled={loading}
              required
            />
            <input 
              type="email" 
              placeholder='Email' 
              name='email' 
              onChange={handleChange} 
              disabled={loading}
              required
            />
            <input 
              type="password" 
              placeholder='Password (min. 8 chars)' 
              name='password' 
              onChange={handleChange} 
              disabled={loading}
              minLength={8}
              required
            />
            <input 
              type="text" 
              placeholder='Full Name' 
              name='name' 
              onChange={handleChange} 
              disabled={loading}
              required
            />
            {err && <span style={{ color: 'red', fontSize: '12px' }}>{err}</span>}
            <div className="button-box">
              <button type='submit' disabled={loading}>
                {loading ? <CircularProgress size={20} color="inherit" /> : "Register"}
              </button>
            </div>
          </form>

          <div className="mobile-login">
            <span>Already have an account?</span>
            <Link to="/login">
              <button disabled={loading}>Login</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
