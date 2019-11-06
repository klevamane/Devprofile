import React, { Fragment, useEffect } from 'react';
import Landing from './components/layout/Landing';
// Components
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/utils/Alert';

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';


import store from './store';

import './App.css';
import { loadUser } from './actions/auth/auth';
import setAuthenticationToken from './utils/setAuthenticationToken';

if(localStorage.devprofiletkn) {
  setAuthenticationToken(localStorage.devprofiletkn);
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
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
  )
};

export default App;
