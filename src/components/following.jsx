import React, { Component } from 'react';
import Navigation from './navbar';

import authorizationToken from '../services/tokenService';

class Following extends Component {
    state = { 
        isTokenExist: Boolean
     }

    componentDidMount() {
        const jwt = localStorage.getItem('JWT');
        const isTokenExist = authorizationToken(jwt);

        if (isTokenExist) {
            // Backend
        } else {
            this.props.history.push('/home');
        }
        
        this.setState({ isTokenExist });
    }

    render() { 
        return ( 
            <React.Fragment>
                <Navigation 
                    {...this.props} 
                    isTokenExist = {this.state.isTokenExist}
                />

                <h1>Following</h1>
            </React.Fragment>
         );
    }
}
 
export default Following;