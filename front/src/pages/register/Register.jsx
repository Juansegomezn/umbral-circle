import { Link } from 'react-router-dom'
import './register.scss'

export const Register = () => {
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
          <form>
            <input type="text" placeholder='Username'/>
            <input type="email" placeholder='Email'/>
            <input type="password" placeholder='Password'/>
            <input type="text" placeholder='Full Name'/>
            <div className="button-box">
              <button>Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
