import { Link, useNavigate } from 'react-router-dom'
import './register.scss'
import { useState } from 'react';
import { makeRequest } from '../../axios';

export const Register = () => {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    name: ''
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if(err) setErr(null);
  };
  
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await makeRequest.post('/auth/register', inputs);
      navigate('/login');
    } catch (err) {
      setErr(err.response?.data || 'An error occurred during registration. Please try again.');
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
            <input type="text" placeholder='Username' name='username' onChange={handleChange}/>
            <input type="email" placeholder='Email' name='email' onChange={handleChange}/>
            <input type="password" placeholder='Password' name='password' onChange={handleChange}/>
            <input type="text" placeholder='Full Name' name='name' onChange={handleChange}/>
            {err && <span style={{color:'red', fontSize:'12px'}}>{err}</span>}
            <div className="button-box">
              <button type='submit'>Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
