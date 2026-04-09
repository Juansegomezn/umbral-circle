import { Link, useNavigate } from 'react-router-dom'
import './login.scss'
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';
import { useState } from 'react';

export const Login = () => {
  const {login} = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if(err) setErr(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate('/');
    } catch (err) {
      setErr(err.response?.data || 'An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Umbral Circle</h1>
          <p>
            Connect with creators, share your vision, and explore new horizons. 
            Join our community and start your journey today.
          </p>
          <span>Don't you have an account yet?</span>
          <Link to="/register" style={{width:'60%'}}>
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input type="text" placeholder='Username' name='username' onChange={handleChange}/>
            <input type="password" placeholder='Password' name='password' onChange={handleChange}/>
            {err && <span style={{color:'red', fontSize:'12px'}}>{err}</span>}
            <div className="button-box">
              <button type="submit">Login</button>
            </div>
          </form>

          <div className="mobile-register">
            <span>Don't you have an account yet?</span>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
