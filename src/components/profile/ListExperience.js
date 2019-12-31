import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Moment from 'react-moment';

// Actions
import { deleteExperience } from '../../actions/profile';

const ListExperience = ({experienceArr, deleteExperience}) => {
    const experiences = experienceArr.map(exp =>(
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
        <td>
        <Moment format="DD/MM/YYYY">{exp.from}</Moment> - 
        
        {exp.to == null ? ('Present'): (<Moment format="DD/MM/YYYY">{exp.to}</Moment>)}
        </td>
        <td>
              <button className="btn btn-danger" onClick={e =>deleteExperience(exp._id)}>
                Delete
              </button>
        </td>
        </tr>
    ));

    return (
        <Fragment>
             <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            {experiences}
        </tbody>
      </table>
        </Fragment>
    )
}

ListExperience.propTypes = {

}

export default connect(null, {deleteExperience})(ListExperience);

