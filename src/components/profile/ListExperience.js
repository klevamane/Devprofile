import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';

const ListExperience = ({experienceArr}) => {
    const experiences = experienceArr.map(exp =>(
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td class="hide-sm">{exp.title}</td>
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
             <h2 class="my-2">Experience Credentials</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Company</th>
            <th class="hide-sm">Title</th>
            <th class="hide-sm">Years</th>
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

export default ListExperience

