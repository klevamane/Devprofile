import React, { Fragment } from 'react'
import { Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth/auth';


const Navbar = ({auth: { isAuthenticated, loading }, logout}) => {
    let loginLogoutLink;

    const logoutUser = () => {
        logout();
    }
    if(isAuthenticated) {
        loginLogoutLink =
        <Fragment>
            <li><Link to="dashboard" >Dashboard</Link></li>
            <li><a href="#!" onClick={logoutUser}>Logout</a></li>
        </Fragment> 
    }
    else {
        loginLogoutLink = 
        <Fragment>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </Fragment>
    }
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            <ul>
                <li><Link to="/developer">Developers</Link></li>
                {loginLogoutLink}
            </ul>
      </nav>
    )
}
Navbar.propType = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
}


const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, { logout })(Navbar)
