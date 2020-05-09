import React, { Component } from 'react';
import { Card, Dropdown, DropdownButton, ButtonGroup, Badge } from 'react-bootstrap';

import { AiOutlineLike } from 'react-icons/ai';
import { GoComment } from 'react-icons/go';
import { RiShareForwardLine, RiDeleteBin6Line } from 'react-icons/ri';
import { MdPlaylistAdd, MdPlaylistAddCheck } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import { GrEdit } from 'react-icons/gr';

import * as authorService from '../../services/authorService';
import authorizationToken from '../../services/tokenService';

class BlogsCards extends Component {
    state = { 
        followed: Boolean,
        isTokenExist: Boolean
    }

    async componentDidMount() {
        const jwt = localStorage.getItem('JWT');
        const isTokenExist = authorizationToken(jwt);
        
        const followed = this.props.currentFollowing?.includes(this.props.blog.authorId._id);
        
        this.setState({ isTokenExist, followed });
    }

    handleFollowing = async id => {
        let followed = !this.state.followed;
        await authorService.handleFollows(id);

        this.setState({ followed });
    }

    render() { 
        const { isTokenExist, followed } = this.state;
        const { fullName, blog, currentId } = this.props;

        const homePath = this.props.match.path === '/home'; 

        return ( 
            <React.Fragment>
                <Card className="card post__card">
                    
                    <Card.Body>
                        <div className="post__heading">
                            <div>
                                {homePath? 
                                    <Card.Title className="card__title">{blog.authorId.fullName}</Card.Title>
                                    :
                                    <Card.Title className="card__title">{fullName}</Card.Title>
                                }
                                <Card.Subtitle className="card__subtitle">{blog.title}</Card.Subtitle>
                                <span className="post__created">{blog.createdAt.split('T')[0]}</span>
                            </div>
                            { isTokenExist && homePath && (blog.authorId._id !== currentId) &&
                                <div className={ followed ? 'post__link text-success' : 'post__link'} onClick={() => this.handleFollowing(blog.authorId._id)}>   
                                    <span className="post__icon">
                                        {followed? <MdPlaylistAddCheck /> : < MdPlaylistAdd />}
                                    </span>
                                    <span>{followed ? 'Following' : 'Follow'}</span>
                                </div>
                            }
                            { ( (isTokenExist && this.props.match.path !== '/profile/:id') && (blog.authorId._id === currentId) ) &&
                                <DropdownButton
                                    as={ButtonGroup}
                                    key="left"
                                    drop="left"
                                    id="post__dropdown"
                                    title={ <BsThreeDots /> }
                                >
                                    <Dropdown.Item> 
                                        <GrEdit /> 
                                        <span className="post__icon-dropdown">Edit Blog</span>
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item>
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
}
 
export default BlogsCards;
