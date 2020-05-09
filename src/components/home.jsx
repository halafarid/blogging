import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import * as AuthorService from '../services/authorService';
import * as BlogService from '../services/blogService';
import authorizationToken from '../services/tokenService';

import Navigation from './navbar';
import BlogsCards from './cards/blogsCards';
import InformationCard from './cards/informationCard';
import CreateBlogCard from './cards/createBlogCard';

class Home extends Component {
    state = { 
        blogs: [],
        account: {},
        isTokenExist: Boolean
    }

    async componentDidMount() {
        // Give all posts
        var { data: blogs } = await BlogService.getAll();

        const jwt = localStorage.getItem('JWT');
        const isTokenExist = authorizationToken(jwt);

        if(isTokenExist) 
            var { data: account } = await AuthorService.getProfile();
        
            this.setState({ isTokenExist, account, blogs });
        }
        
    render() { 
        const { isTokenExist, blogs, account } = this.state;

        return ( 
            <React.Fragment>
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
                                        currentId = {account._id}
                                    />
    
                                    <hr className="horizontal" />
                                </React.Fragment>
                            }

                            {blogs.map(blog => (
                                <BlogsCards
                                    { ...this.props }
                                    key = {blog._id}
                                    isTokenExist = {isTokenExist}
                                    blog = {blog}
                                    currentId = {account?._id}
                                    currentFollowing = {account?.following}
                                />
                            ))}

                        </Col>
                    </Row>
                </div>
            </React.Fragment>
         );
    }
}
 
export default Home;