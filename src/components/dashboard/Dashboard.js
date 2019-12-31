import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import DashboardActions from './DashboardActions';
import ListExperience from '../profile/ListExperience';
import ListEducation from '../profile/ListEducation';

// Actions
import { getCurrentProfile } from '../../actions/profile';

import Loader from '../utils/Loader';

 const Dashboard = ({getCurrentProfile, auth: { user }, profile: { loading, profile } }) => {
     useEffect(() => {
         getCurrentProfile()
     }, []);

     return loading && profile === null ? <Loader /> : 
        <Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i>Welcome { user && user.firstname }</i>
            </p>
            {
            profile !== null ? 
                <Fragment>
                <DashboardActions />
                <ListExperience experienceArr={profile.experience} />
                <ListEducation educationArr={profile.education} />
                </Fragment> : 
                <Fragment>
                    <p>You have not set up a profile yet. click here</p>  
                    <Link to="/create-profile" className="btn btn-primary">
                        Create profile
                    </Link>
                </Fragment>}
         </Fragment>
 }

 Dashboard.propTypes = {
     getCurrentProfile: PropTypes.func.isRequired,
     auth: PropTypes.object.isRequired,
     profile: PropTypes.object.isRequired
 };


 const mapStateToProps = state => ({
     auth: state.auth,
     profile: state.profile,
 });
 
 export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
