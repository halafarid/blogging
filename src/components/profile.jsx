import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import InformationCard from './cards/informationCard';
import * as AuthorService from '../services/authorService';

import Navigation from './navbar';
import BlogsCards from './cards/blogsCards';
import authorizationToken from '../services/tokenService';

class Profile extends Component {
    state = { 
        account: {
            fullName: '',
            email: '',
            address: '',
            age: null,
            blogs: [],
            following: 0,
        },
        followers: 0,
        isTokenExist: Boolean
    }
    
    async componentDidMount() {
        const id = this.props.match.params.id;

        const jwt = localStorage.getItem('JWT');
        const isTokenExist = authorizationToken(jwt);

        if (isTokenExist) {
            const { data: myProfile } = await AuthorService.getProfile();
            
            // lw ktbt fel url id el profile bta3y => yro7 lel profile
            if (id === myProfile._id) {
                this.props.history.push('/profile');
                this.setState({ account: myProfile });
            }
            // User Profile
            else if (this.props.match.path === '/profile/:id') {
                const { data: account } = await AuthorService.getById(id);
                this.setState({ account });
            } 
            // My Profile
            else {
                var { data: followers } = await AuthorService.getFollowers();
                this.setState({ account: myProfile, followers });
            }
                
        } else {
            this.props.history.push('/home');
        }

       this.setState({ isTokenExist });
    }
    
    render() { 
        const { isTokenExist, account } = this.state;

        return ( 
            <React.Fragment>
                <Navigation 
                    {...this.props}
                    isTokenExist = {isTokenExist}
                />

                <div className="profile">
                    <div className="container">
                        <Row>
                            <Col md={9}>
                                <InformationCard 
                                    {...this.props}
                                    account = {this.state.account}
                                    followers = {this.state.followers}
                                />

                                {account.blogs.map( blog => (
                                    <BlogsCards
                                        {...this.props} 
                                        key = {blog._id}
                                        fullName = {this.state.account.fullName}
                                        blog = {blog}
                                    />
                                ))}

                            </Col>

                            <Col md={3}> 
                                <img src={require("../images/advertising.jpg")} alt="Advertising" className="advertising"/>
                            </Col>
                        </Row>
                    </div>
                </div>
                
            </React.Fragment>
        );
    }
}
 
export default Profile;