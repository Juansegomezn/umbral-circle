import { Link } from 'react-router-dom'
import './login.scss'

export const Login = () => {
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
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder='Username'/>
            <input type="password" placeholder='Password'/>
            <div className="button-box">
              <button>Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
