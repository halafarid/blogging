import React from 'react';

import { Card } from 'react-bootstrap';
import { TiEdit } from 'react-icons/ti';

import BlogModal from './BlogModal';

const CreateBlogCard = props => {
    const { isShow, isValid, blog, handleModal, handleBlog, handleChange, handleAddTag, handleDeleteTag} = props;

    return ( 
        <React.Fragment>
            <Card className="card">
                <Card.Body>
                    <Card.Title className="card__title post__link-title">
                        <span className="link link__icon">
                            <TiEdit />
                        </span>
                        <a href="#/" className="link" onClick={() => handleModal(true)}>Create a Blog</a>
                    </Card.Title>

                    <BlogModal 
                        {...props}
                        isShow = {isShow}
                        isValid = {isValid}
                        blog = {blog}
                        handleModal = {handleModal}
                        handleBlog = {handleBlog}
                        handleChange = {handleChange}
                        handleAddTag = {handleAddTag}
                        handleDeleteTag = {handleDeleteTag}
                    />

                </Card.Body>

                <Card.Footer className="text-muted">
                    <span>Write an article on website</span>
                </Card.Footer>
            </Card>
        </React.Fragment>
    );
}
 
export default CreateBlogCard;