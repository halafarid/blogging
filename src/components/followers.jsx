import React, { Component } from 'react';
import Navigation from './navbar';

class Followers extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <Navigation {...this.props} />

                <h1>Followers</h1>
            </React.Fragment>
        );
    }
}
 
export default Followers;