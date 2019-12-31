import React, { Fragment, useState } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'


// Components

// Actions
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth/auth';

const Register = (props) => {// props can also be destructured as ({register, isAuthenticated})
    
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password2: '',
    });

    const { firstname, lastname, email, password, confirmpwd } = formData;
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value})
    const onSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmpwd){
            props.setAlert('password does not match', 'danger')
        
        }
        const newUser = {
            firstname,
            lastname,
            email,
            password,
            confirmpwd
        }
        props.register(newUser, props.history);
    }
    if(props.isAuthenticated) {
        return <Redirect to="dashboard" />
    }

    return (
      <Fragment>
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Create Your Account
        </p>
        <form className="form" onSubmit={onSubmit} action="create-profile.html">
          <div className="form-group">
            <input type="text" onChange={onChange} placeholder="Firstname" name="firstname" value={firstname} />
          </div>
          <div className="form-group">
            <input type="text" onChange={onChange} placeholder="Lastname" name="lastname" value={lastname} />
          </div>
          <div className="form-group">
            <input type="email" onChange={onChange} placeholder="Email Address" name="email" value={email} />
            <small className="form-text">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmpwd"
              minLength="6"
              value={confirmpwd}
              onChange={onChange}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </Fragment>
    );
}

Register.propTypes = {
    props: PropTypes.object, 
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

// Add the action(s) to the connect method
export default connect(mapStateToProps, { setAlert, register })(withRouter(Register))
