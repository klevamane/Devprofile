import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';

const ListEducation = ({educationArr}) => {
    const education = educationArr.map(exp =>(
        <tr key={exp._id}>
            <td>{exp.school}</td>
            <td class="hide-sm">{exp.degree}</td>
        <td>
        <Moment format="DD/MM/YYYY">{exp.from}</Moment> - 
        
        {exp.to == null ? ('Present'): (<Moment format="DD/MM/YYYY">{exp.to}</Moment>)}
        </td>
        <td>
              <button class="btn btn-danger">
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

export default ListEducation

