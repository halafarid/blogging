import React, { Component } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

import {FiSearch} from 'react-icons/fi';

import * as blogService from '../services/blogService';
import authorizationToken from './../services/tokenService';

import Navigation from './navbar';
import BlogsCards from './cards/blogsCards';

class Search extends Component {
    state = { 
        isTokenExist: Boolean,
        search: {
            type: '',
            inputValue: '',
        },
        blogs: [],
     }

    componentDidMount() {
        const jwt = localStorage.getItem('JWT');
        const isTokenExist = authorizationToken(jwt);

        this.setState({ isTokenExist });
    }

    handleChange = async ({ target }) => {
        const search = {...this.state.search};
        search[target.name] = target.value;

        this.setState({ search })
    }
    
    handleSubmit = async e => {
        e.preventDefault();
        
        const search = {...this.state.search};
        if (search.type !== '' && search.inputValue !== '')
            var {data: blogs} = await blogService.getBlogsOnSearch(search.type, search.inputValue)

        this.setState({ search, blogs });
    }

    render() { 
        const {isTokenExist, blogs} = this.state;
        return ( 
            <React.Fragment>
                <Navigation 
                    {...this.props}
                    isTokenExist = {isTokenExist}
                />

                <div className="container">
                    <Form className="form__search">
                        <Form.Row>
                            <Form.Group as={Col} className="form__group">
                                <Form.Control onChange={this.handleChange} name="inputValue" placeholder="Search..." className="form__control form__control--search" autoComplete="off"/>
                            </Form.Group>

                            <Form.Group as={Col} className="form__group">
                                <Form.Control as="select" defaultValue="Select Type" name="type" onChange={this.handleChange} className="form__control form__control--search form__control--type">
                                    <option value="name">Select Type</option>
                                    <option value="name">Author</option>
                                    <option value="title">Title</option>
                                    <option value="tag">Tag</option>
                                </Form.Control>

                                <Button variant="success" onClick={this.handleSubmit} className="btn btn__search">
                                    <FiSearch />
                                </Button>
                            </Form.Group>
                        </Form.Row>
                    </Form>

                    <Row>
                        <Col md={9} className="search">
                            {blogs?.length > 0?
                                blogs.map(blog => (
                                    <BlogsCards
                                        {...this.props} 
                                        blog = {blog}
                                        key = {blog._id}
                                        isTokenExist = {isTokenExist}
                                        fullName = {blog.authorId.fullName}
                                        showUserProfile = {this.props.showUserProfile}
                                    />
                                ))
                                :
                                <img src={require("../images/search.png")} alt="Search" className="search__photo" />
                            }
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
         );
    }
}
 
export default Search;