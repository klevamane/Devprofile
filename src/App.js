import React, { Fragment } from 'react';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';

import './App.css';

const App = () => 
// Fragment wont show up in the dom
    <Fragment>
      <Navbar />
      <Landing />
    </Fragment>

export default App;
