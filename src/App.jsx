import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

import LogIn from './components/Authentication/login';
import Registration from './components/Authentication/registeration';
import Home from './components/home';
import Profile from './components/profile';
import Page404 from './components/page404';
import Following from './components/following';
import Followers from './components/followers';

class App extends Component {
  state = {  }

  
  render() { 

    return ( 
      <React.Fragment>
        <ToastContainer />

        <Switch>
          <Route path="/home" component={Home} />
          
          <Route path="/auth/login" component={LogIn}/>
          <Route path="/auth/registration" component={Registration} />

          <Route path="/profile/:id" component={Profile} />
          <Route path="/profile" component={Profile} />

          <Route path="/following" component={Following} />
          <Route path="/followers" component={Followers} />

          <Route path="/page404" component={Page404} />

          <Redirect from="/" to="/home" exact />
          <Redirect to="/page404" />
        </Switch>
      </React.Fragment>

    );
  }
}

axios.interceptors.response.use(null, error => {
  if (!(error.response && error.response.status >= 400 && error.response.status < 500))
    toast.error('Sorry, We have problem on the network');

    return Promise.reject(error);
});
 
export default App;
