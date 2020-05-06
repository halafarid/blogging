import React, { Component } from 'react';
import Navigation from './navbar';
import InformationCard from './cards/informationCard';

class Home extends Component {
    state = {  }
    
    render() { 
        return ( 
            <React.Fragment>
                <Navigation {...this.props} />

                <div className="profile">
                    <div className="container">
                        <InformationCard
                            {...this.props}
                        />
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default Home;