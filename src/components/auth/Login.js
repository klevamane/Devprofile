import React, { Fragment, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Register from './Register'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData;
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value})
    
    const onSubmit = async (e) => {
        e.preventDefault()
    
        const loginDetails = {
            email,
            password,
        };
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify(loginDetails)
            const res = await axios.post('http://localhost:5000/api/v1/users/login', body, config);
            console.log('response: ', res);
        }
        catch(err) {
            console.error(err.response.data)
        }
    }

    return (
      <Fragment>
        <div className="alert alert-danger">
        Invalid credentials
      </div>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
      <form onSubmit={onSubmit} className="form" action="dashboard.html">
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            required
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
      </Fragment>
    );
}

export default Login
