import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import authorizationToken from './../services/tokenService';

import Navigation from './navbar';
import BlogsCards from './cards/blogsCards';
import InformationCard from './cards/informationCard';
import CreateBlogCard from './cards/createBlogCard';

class Home extends Component {
    state = { 
        accounts: [],
        isTokenExist: Boolean
    }

    componentDidMount() {
        // Give all posts

        const token = localStorage.getItem('JWT');
        const isTokenExist = authorizationToken(token);

        isTokenExist ? console.log('Exist') : console.log('Not exist');

        this.setState({ isTokenExist });
    }
    
    render() { 
        return ( 
            <React.Fragment>
                <Navigation 
                    {...this.props}
                    isTokenExist = {this.state.isTokenExist}
                />

                <div className="container">
                    <Row>
                        <Col md={3}>
                            <img src={require("../images/advertising.jpg")} alt="Advertising" className="advertising"/>

                            <InformationCard
                                {...this.props}
                                isTokenExist = {this.state.isTokenExist}
                            />
                        </Col>

                        <Col md={9}>
                            <CreateBlogCard />

                            <hr className="horizontal" />

                            <BlogsCards
                                { ...this.props }
                                account = {this.state.accounts}
                            />

                            <BlogsCards
                                { ...this.props }
                                account = {this.state.accounts}
                            />

                            <BlogsCards
                                { ...this.props }
                                account = {this.state.accounts}
                            />
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
         );
    }
}
 
export default Home;