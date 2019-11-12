import React, { Fragment, useEffect } from 'react';
import Landing from './components/layout/Landing';
// Components
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/utils/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile/CreateProfile';
import PrivateRoute from './components/utils/PrivateRoute';

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';


import store from './store';

import './App.css';
import { loadUser } from './actions/auth/auth';
import setAuthenticationToken from './utils/setAuthenticationToken';

if(localStorage.devprofiletkn) {
  setAuthenticationToken(localStorage.devprofiletkn);
  console.log('yes token exists');
}
const App = () => {
  
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])
  return (
  // Fragment wont show up in the dom
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} /> 
            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
  )
};

export default App;
