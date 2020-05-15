import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import authorizationToken from '../services/tokenService';
import * as BlogService from '../services/blogService';
import * as AuthorService from '../services/authorService';

import Navigation from './navbar';
import BlogsCards from './cards/blogsCards';
import InformationCard from './cards/informationCard';
import CreateBlogCard from './cards/createBlogCard';

class Home extends Component {
    state = { 
        account: {}
    }

    async componentDidMount() {
        const pageNo = 1;
        const size = 5;
        var { data: blogs } = await BlogService.getAll(pageNo, size);

        const jwt = localStorage.getItem('JWT');
        const isTokenExist = authorizationToken(jwt);

        if(isTokenExist) 
            var { data: account } = await AuthorService.getProfile();
    
        window.addEventListener('scroll', this.props.handleScroll, true);

        this.setState({ isTokenExist, blogs, account, pageNo, size });
    }    

    componentWillUnmount() {
        window.removeEventListener('scroll', this.props.handleScroll);
    }
    
    render() { 
    const { loading, blogs, blog, isShow, isValid, showUserProfile, handleModal, handleChange, handleAddTag, handleDeleteTag, handleBlog, handleDeleteBlog } = this.props;
    const { isTokenExist, account } = this.state;

    return ( 
        <React.Fragment>
            <ToastContainer />

            <Navigation 
                {...this.props}
                isTokenExist = {isTokenExist}
            />

            <div className="container">
                <Row>
                    <Col md={3}>
                        <img src={require("../images/advertising.jpg")} alt="Advertising" className="advertising"/>

                        {isTokenExist &&
                            <InformationCard
                                {...this.props}
                                isTokenExist = {isTokenExist}
                                account = {account}
                            />
                        }
                    </Col>

                    <Col md={9}>

                        {isTokenExist && 
                            <React.Fragment>
                                <CreateBlogCard 
                                    blog = {blog}
                                    isShow = {isShow}
                                    isValid = {isValid}

                                    handleModal = {handleModal}
                                    handleBlog = {handleBlog}
                                    handleChange = {handleChange}
                                    handleAddTag = {handleAddTag}
                                    handleDeleteTag = {handleDeleteTag}
                                />

                                <hr className="horizontal" />
                            </React.Fragment>
                        }

                        {blogs?.map(blog => (
                            <BlogsCards
                                { ...this.props }
                                key = {blog._id}
                                blog = {blog}
                                currentId = {account?._id}
                                isTokenExist = {isTokenExist}
                                showUserProfile = {showUserProfile}

                                isShow = {isShow}
                                handleModal = {handleModal}
                                handleBlog = {handleBlog}
                                handleDeleteBlog = {handleDeleteBlog}
                            />
                        ))}
                    </Col>
                </Row>

                {loading &&
                    <div className="bubblingG">
                        <span id="bubblingG_1">
                        </span>
                        <span id="bubblingG_2">
                        </span>
                        <span id="bubblingG_3">
                        </span>
                    </div>
                }
            </div>
        </React.Fragment>
    );
    }
}
 
export default Home;