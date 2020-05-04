import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

import LogIn from './components/Authentication/login';
import Registration from './components/Authentication/registeration';
import Home from './components/home';

class App extends Component {
  state = {  }

  
  render() { 

    return ( 
      <React.Fragment>
        <ToastContainer />

        <Route path="/" exact component={Home} />
        <Route path="/auth/login" component={LogIn}/>
        <Route path="/auth/registration" component={Registration} />
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
