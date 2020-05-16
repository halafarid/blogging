import React, { Component } from 'react';
import Navigation from './navbar';

import * as authorService from './../services/authorService';
import authorizationToken from '../services/tokenService';
import FollowsCard from './cards/followsCars';

class Followers extends Component {
    state = { 
        isTokenExist: Boolean,
        follows: []
     }

    async componentDidMount() {
        const jwt = localStorage.getItem('JWT');
        const isTokenExist = authorizationToken(jwt);

        if (isTokenExist) {
            var { data: follows } = await authorService.getFollowers();
        } else {
            this.props.history.push('/home');
        }

        this.setState({ isTokenExist, follows });
    }

    render() { 
        const { follows } = this.state;
        return ( 
            <React.Fragment>
                <Navigation 
                    {...this.props} 
                    isTokenExist = {this.state.isTokenExist}
                />

                <div className="container">
                    <div className="follows">
                        {follows.length > 0 ?
                            follows.map(follow => (
                                <FollowsCard 
                                    {...this.props}
                                    key = {follow._id}
                                    follow = {follow}
                                />
                            ))
                            :
                            <div className="follows__notfound">
                                <h2 className="follows__notfound-heading">You don't have any followers</h2>
                                <img className="follows__notfound-img" src={require('../images/notResult.png')} alt="not result"/>
                            </div>
                        }
                    </div>
               </div>
            </React.Fragment>
         );
    }
}
 
export default Followers;