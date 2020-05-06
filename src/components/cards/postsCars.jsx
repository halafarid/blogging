import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

import { AiOutlineLike } from 'react-icons/ai';
import { GoComment } from 'react-icons/go';
import { RiShareForwardLine } from 'react-icons/ri';
import { MdPlaylistAdd, MdPlaylistAddCheck } from 'react-icons/md';

class PostsCard extends Component {
    state = { 
        follow: false

    }


    handleFollowing = () => {
        let follow = !this.state.follow;
        this.setState({ follow });
    }

    render() { 
        const { follow } = this.state;

        return ( 
            <React.Fragment>
                <Card className="card post__card">
                    
                    <Card.Body>
                        <div className="post__heading">
                            <div>
                                <Card.Title className="card__title">Author name</Card.Title>
                                <Card.Subtitle className="card__subtitle">Blog title</Card.Subtitle>
                            </div>
                            {this.props.match.path !== '/profile' &&
                                <div className={ follow ? 'post__link text-success' : 'post__link'} onClick={this.handleFollowing}>
                                    <span className="post__icon">
                                        {follow? <MdPlaylistAddCheck /> : < MdPlaylistAdd />}
                                    </span>
                                    <span>{follow ? 'Following' : 'Follow'}</span>
                                </div>
                            }
                        </div>
                        <Card.Text>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi officia perspiciatis fugit accusantium fuga doloremque odit. Rem vel neque placeat quibusdam dolorem omnis eveniet officia nisi veniam culpa. Magnam impedit ut sapiente. Debitis, voluptatum incidunt? Aperiam, nobis ipsa quas saepe temporibus quo quisquam recusandae deleniti cumque beatae commodi doloremque molestiae, est, nostrum dolor corrupti? Saepe rerum expedita inventore eum a?
                        </Card.Text>
                    </Card.Body>
    
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
                </Card>
            </React.Fragment>
        );
    }
}
 
export default PostsCard;
