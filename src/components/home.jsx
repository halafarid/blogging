import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import * as AuthorService from '../services/authorService';
import authorizationToken from '../services/tokenService';

import Navigation from './navbar';
import BlogsCards from './cards/blogsCards';
import InformationCard from './cards/informationCard';
import CreateBlogCard from './cards/createBlogCard';

class Home extends Component {
    state = { 
        accounts: [],
        account: {},
        isTokenExist: Boolean
    }

    async componentDidMount() {
        // Give all posts
        const jwt = localStorage.getItem('JWT');
        const isTokenExist = authorizationToken(jwt);

        if(isTokenExist) 
            var { data: account } = await AuthorService.getProfile();

        this.setState({ isTokenExist, account });
    }
    
    render() { 
        const { isTokenExist } = this.state;
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
                                    account = {this.state.account}
                                />
                            }
                        </Col>

                        <Col md={9}>
                            {isTokenExist && 
                                <React.Fragment>
                                    <CreateBlogCard />
    
                                    <hr className="horizontal" />
                                </React.Fragment>
                            }

                            <BlogsCards
                                { ...this.props }
                                account = {this.state.accounts}
                                isTokenExist = {isTokenExist}
                            />

                            <BlogsCards
                                { ...this.props }
                                account = {this.state.accounts}
                                isTokenExist = {isTokenExist}
                            />

                            <BlogsCards
                                { ...this.props }
                                account = {this.state.accounts}
                                isTokenExist = {isTokenExist}
                            />
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
         );
    }
}
 
export default Home;