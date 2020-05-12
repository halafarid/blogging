import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import InformationCard from './cards/informationCard';
import * as AuthorService from '../services/authorService';

import Navigation from './navbar';
import BlogsCards from './cards/blogsCards';
import authorizationToken from '../services/tokenService';
import BlogModal from './cards/BlogModal';

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
        isTokenExist: Boolean,
        followed: Boolean
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
                const followed = myProfile.following.includes(account._id);
                this.setState({ account, followed });
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

    handleFollowing = async () => {
        let followed = !this.state.followed;
        await AuthorService.handleFollows(this.props.match.params.id);
        this.setState({ followed });
    }

    handleEditUser = () => {

    }
    
    render() { 
        const { isTokenExist, account } = this.state;
        const {blog, isShow, isValid, handleModal, handleChange, handleAddTag, handleDeleteTag, handleBlog, handleDeleteBlog} = this.props;

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
                                    followed = {this.state.followed}
                                    followers = {this.state.followers}

                                    handleEditUser = {this.handleEditUser}
                                    handleFollowing = {this.handleFollowing}
                                />

                                {account.blogs?.length > 0 ?
                                    account.blogs.map( blog => (
                                        <BlogsCards
                                            {...this.props} 
                                            blog = {blog}
                                            key = {blog._id}
                                            isTokenExist = {isTokenExist}
                                            fullName = {account.fullName}
                                            handleModal = {handleModal}
                                            handleBlog = {handleBlog}
                                            handleDeleteBlog = {handleDeleteBlog}
                                        />
                                    ))
                                    :
                                    <h2 className="profile__noblog"> No blogs right now</h2>
                                }

                                <BlogModal 
                                    {...this.props}
                                    blog = {blog}
                                    isShow = {isShow}
                                    isValid = {isValid}
                                    handleBlog = {handleBlog}
                                    handleModal = {handleModal}
                                    handleChange = {handleChange}
                                    handleAddTag = {handleAddTag}
                                    handleDeleteTag = {handleDeleteTag}
                                />

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