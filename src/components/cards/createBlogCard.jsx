import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { TiEdit } from 'react-icons/ti';
import BlogModal from './BlogModal';

class CreateBlogCard extends Component {
    state = { 
        isShow: false
     }

     handleModal = bool => {
        const isShow = bool;
        this.setState({ isShow });
    }

     createBlog = blog => {
         const isShow = false;
         this.setState({ isShow });
         console.log("valid");
        console.log(blog);
         // call backend
    }

    render() { 
        return ( 
            <React.Fragment>
                <Card className="card">
                    <Card.Body>
                        <Card.Title className="card__title post__link-title">
                            <span className="link link__icon">
                                <TiEdit />
                            </span>
                            <a href="#/" className="link" onClick={() => this.handleModal(true)}>Create a Blog</a>
                        </Card.Title>

                        <BlogModal 
                            {...this.props}
                            isValid = {this.state.isValid}
                            isShow = {this.state.isShow}
                            handleModal = {this.handleModal}
                            createBlog = {this.createBlog}
                        />

                    </Card.Body>
    
                    <Card.Footer className="text-muted">
                        <span>Write an article on website</span>
                    </Card.Footer>
                </Card>
            </React.Fragment>
        );
    }
}
 
export default CreateBlogCard;
