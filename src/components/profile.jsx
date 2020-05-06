import React, { Component } from 'react';
import Navigation from './navbar';

import InformationCard from './cards/informationCard';
import * as AuthorService from '../services/authorService';
import authorizationToken from './../services/tokenService';

class Profile extends Component {
    state = { 
        account: {
            fullName: '',
            email: '',
            address: '',
            age: 0,
            blogs: 0,
            following: 0,
            followers: 0
        }
    }
    
    async componentDidMount() {
        const id = this.props.match.params.id;

        const jwt = localStorage.getItem('JWT');
        authorizationToken(jwt);

        if (this.props.match.path === '/profile/:id') {
            const { data: account } = await AuthorService.getById(id);
            this.setState({ account });
        }
    }
    
    render() { 
        return ( 
            <React.Fragment>
                <Navigation {...this.props} />

                <div className="profile">
                    <div className="container">
                        <InformationCard 
                            {...this.props}
                            account = {this.state.account}
                        />
                    </div>
                </div>

            </React.Fragment>
        );
    }
}
 
export default Profile;