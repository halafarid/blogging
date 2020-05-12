import React from 'react';
import { Link } from 'react-router-dom';

import { Card, Dropdown, DropdownButton, ButtonGroup, Badge } from 'react-bootstrap';

import { RiShareForwardLine, RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineLike } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { GoComment } from 'react-icons/go';
import { GrEdit } from 'react-icons/gr';

const BlogsCards = props => {
    const { isTokenExist, fullName, blog, currentId, handleModal, handleDeleteBlog, showUserProfile, match } = props;
    const homePath = match.path === '/home'; 

    return ( 
        <React.Fragment>
            <Card className="card post__card">
                
                <Card.Body>
                    <div className="post__heading">
                        <div>
                            {homePath? 
                                <Card.Title className="card__title" onClick={() => showUserProfile(blog.authorId._id)}>
                                    <Link to={`profile/${blog.authorId._id}`} className="link">{blog.authorId.fullName}</Link>
                                </Card.Title>
                                :
                                <Card.Title className="card__title">{fullName}</Card.Title>
                            }
                            <Card.Subtitle className="card__subtitle">{blog.title}</Card.Subtitle>
                            <span className="post__created">{blog.createdAt.split('T')[0]}</span>
                        </div>

                        { ( (isTokenExist && match.path !== '/profile/:id') && (blog.authorId._id === currentId) ) &&
                            <DropdownButton
                                as={ButtonGroup}
                                key="left"
                                drop="left"
                                id="post__dropdown"
                                title={ <BsThreeDots /> }
                            >
                                <Dropdown.Item onClick={() => handleModal(true, blog._id)}> 
                                    <GrEdit /> 
                                    <span className="post__icon-dropdown">Edit Blog</span>
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={() => handleDeleteBlog(blog._id)}>
                                    <RiDeleteBin6Line />
                                    <span className="post__icon-dropdown">Delete Blog</span>
                                </Dropdown.Item>
                            </DropdownButton>
                        }
                    </div>
                    <Card.Text>{blog.body}</Card.Text>

                    <ul>
                        {blog.tags.map( (tag, i) => (
                            <Badge key={i} pill variant="secondary" className="post__tag">
                                {tag}
                            </Badge>
                        ))}
                    </ul>

                </Card.Body>

                {isTokenExist &&
                    <Card.Footer className="post__icons">
                        <div className="post__icons-div">
                            <span className="post__icon">
                                < AiOutlineLike />
                            </span>
                            <span className="text--lg">Like</span>
                        </div>
    
                        <div className="post__icons-div">
                            <span className="post__icon">
                                < GoComment />
                            </span>
                            <span className="text--lg">Comment</span>
                        </div>
    
                        <div className="post__icons-div">
                            <span className="post__icon">
                                < RiShareForwardLine />
                            </span>
                            <span className="text--lg">Share</span>
                        </div>
                    </Card.Footer>
                }
            </Card>
        </React.Fragment>
    );
}
 
export default BlogsCards;


