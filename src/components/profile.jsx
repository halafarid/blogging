import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import InformationCard from './cards/informationCard';
import * as AuthorService from '../services/authorService';
import * as BlogService from '../services/blogService';

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
        followed: Boolean,
        
        pageNo: 1,
        size: 5,
        pageSize: 5,

        blogs: [],
        blogsTotal: 0
    }
    
    async componentDidMount() {
        const id = this.props.match.params.id;
        const pageNo = 1;
        const size = 5;

        const jwt = localStorage.getItem('JWT');
        const isTokenExist = authorizationToken(jwt);

        if (isTokenExist) {
            const { data: myProfile } = await AuthorService.getProfile();
            
            // lw ktbt fel url id el profile bta3y aw dost 3la esmy fel home => yro7 lel profile
            if (id === myProfile._id) {
                this.props.history.push('/profile');
                const {data: {blogs, blogsTotal} } = await BlogService.getAuthorBlogs(myProfile._id, pageNo, size);
                const { data: followers } = await AuthorService.getFollowers();
                this.setState({ account: myProfile, followers, blogs, blogsTotal });
            }
            // User Profile
            else if (this.props.match.path === '/profile/:id') {
                const { data: account } = await AuthorService.getById(id);
                const {data: {blogs, blogsTotal} } = await BlogService.getAuthorBlogs(id, pageNo, size);
                const followed = myProfile.following.includes(account._id);
                this.setState({ account, followed, blogs, blogsTotal });
            } 
            // My Profile
            else {
                const {data: {blogs, blogsTotal} } = await BlogService.getAuthorBlogs(myProfile._id, pageNo, size);
                const { data: followers } = await AuthorService.getFollowers();
                this.setState({ account: myProfile, followers, blogs, blogsTotal });
            }
                
        window.addEventListener('scroll', this.handleScroll, true);

        } else {
            this.props.history.push('/home');
        }

       this.setState({ isTokenExist, pageNo, size });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleFollowing = async () => {
        let followed = !this.state.followed;
        await AuthorService.handleFollows(this.props.match.params.id);
        this.setState({ followed });
    }

    handleScroll = async () => {
        let { account, pageNo, size, pageSize } = this.state;
        if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight ) {
          size += pageSize;
          const {data: {blogs, blogsTotal} } = await BlogService.getAuthorBlogs(account._id, pageNo, size);
          this.setState({ size, blogs, blogsTotal });
        }
    };

    handleEditUser = () => {

    }
    
    render() { 
        const { isTokenExist, account, blogs } = this.state;
        const {loading, blog, isShow, isValid, handleModal, handleChange, handleAddTag, handleDeleteTag, handleBlog, handleDeleteBlog} = this.props;

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
                                    blogsTotal = {this.state.blogsTotal}

                                    handleEditUser = {this.handleEditUser}
                                    handleFollowing = {this.handleFollowing}
                                />

                                {blogs?.length > 0 ?
                                    blogs.map( blog => (
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
                       
                        {blogs?.length > 0 && loading &&
                            <div className="bubblingG bubblingG__profile">
                                <span id="bubblingG_1">
                                </span>
                                <span id="bubblingG_2">
                                </span>
                                <span id="bubblingG_3">
                                </span>
                            </div>
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Profile;