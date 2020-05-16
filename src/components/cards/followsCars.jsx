import React from 'react';
import { Card, Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FollowsCard = ({ follow }) => {
    return ( 
        <React.Fragment>
            <Card className="card follows__card">
                <Link to={`/profile/${follow._id}`} className="link">
                    <Card.Body>
                        <Card.Title className="card__title">{follow.fullName}</Card.Title>
                        <Card.Subtitle className="card__subtitle follows__subtitle">{follow.following?.length} Following </Card.Subtitle>
                        <ul className="list-unstyled list">
                            <Media as="li" className="list__item list__item--mb">
                                <Media.Body className="list__body text--info"> {follow.age} Years old</Media.Body>
                            </Media>

                            <Media as="li" className="list__item list__item--mb">
                                <Media.Body className="list__body text--info">{follow.address}</Media.Body>
                            </Media>
                        </ul>
                    </Card.Body>
                </Link>
            </Card>
        
        </React.Fragment>
     );
}
 
export default FollowsCard;