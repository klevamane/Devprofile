import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

const Alert = ({ alerts }) => 
   alerts !== null & alerts.length > 0 && alerts.map(alert => (
        <div className={`alert alert-${ alert.alertType }`} key={alert.id}>
        { alert.msg }
        </div>
   ))

const mapStateToProps = (state) => ({
    alerts: state.alert
})

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, {})(Alert);
