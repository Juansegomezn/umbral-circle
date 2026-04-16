import { Link, useNavigate } from 'react-router-dom'
import './login.scss'
import { AuthContext } from '../../context/authContext';
import { useContext, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export const Login = () => {
  const {login} = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if(err) setErr(null);
  };

  const handleGuestLogin = async () => {
    const guestCredentials = { username: 'Guess', password: '12345' };
    setInputs(guestCredentials);
    setLoading(true);
    try {
      await login(guestCredentials);
      navigate('/');
    } catch (err) {
      setErr(err.response?.data || 'Guest login failed.');
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    
    if (Object.values(inputs).some(value => value.trim() === "")) {
      return setErr("All fields are required.");
    }
    
    setLoading(true);
    try {
      await login(inputs);
      navigate('/');
    } catch (err) {
      setErr(err.response?.data || 'Invalid username or password.');
      setLoading(false);
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
            <input 
              type="text" 
              placeholder='Username' 
              name='username' 
              value={inputs.username}
              onChange={handleChange}
              disabled={loading}
            />
            <input 
              type="password" 
              placeholder='Password' 
              name='password' 
              value={inputs.password}
              onChange={handleChange}
              disabled={loading}
            />
            {err && <span style={{ color: 'red', fontSize: '12px' }}>{err}</span>}
            <div className="button-box">
              {loading && <CircularProgress size={20} />}
              <button type="submit" disabled={loading}>Login</button>

              <button 
                type="button" 
                className="guest-btn" 
                onClick={handleGuestLogin}
                disabled={loading}
              >
                Login as Guest
              </button>
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
