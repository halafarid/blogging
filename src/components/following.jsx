import React, { Component } from 'react';
import Navigation from './navbar';

class Following extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <Navigation {...this.props} />

                <h1>Following</h1>
            </React.Fragment>
         );
    }
}
 
export default Following;