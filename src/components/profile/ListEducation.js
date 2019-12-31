import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import { connect } from 'react-redux';

// Actions
import { deleteEducation } from '../../actions/profile';

const ListEducation = ({educationArr, deleteEducation}) => {
    const education = educationArr.map(edu =>(
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td class="hide-sm">{edu.degree}</td>
        <td>
        <Moment format="DD/MM/YYYY">{edu.from}</Moment> - 
        
        {edu.to == null ? ('Present'): (<Moment format="DD/MM/YYYY">{edu.to}</Moment>)}
        </td>
        <td>
              <button class="btn btn-danger" onClick={e =>deleteEducation(edu._id)}>
                Delete
              </button>
        </td>
        </tr>
    ));

    return (
        <Fragment>
             <h2 class="my-2">Education Credentials</h2>
      <table class="table">
        <thead>
          <tr>
            <th>School</th>
            <th class="hide-sm">Degree</th>
            <th class="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            {education}
        </tbody>
      </table>
        </Fragment>
    )
}

ListEducation.propTypes = {

}

export default connect(null, {deleteEducation})(ListEducation)

