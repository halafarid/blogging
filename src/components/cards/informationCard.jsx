import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Media } from 'react-bootstrap';

import { FaEnvelope, FaBlog, FaAddressBook } from "react-icons/fa";
import { AiFillCalendar } from 'react-icons/ai';
import { RiUserFollowLine } from 'react-icons/ri';
import { GiShadowFollower } from 'react-icons/gi';
import { MdPlaylistAdd, MdPlaylistAddCheck } from 'react-icons/md';

const InformationCard = props => {
    const { account, match, followers, followed, blogsTotal, handleFollowing } = props;
        
    const profilePath = match.path === '/profile';
    const profileUser = match.path === '/profile/:id';

    return ( 
        <React.Fragment>
            <Card className={profilePath || profileUser ? "card profile__card" : "card"}>
                <div className="card__header-img">
                    <Card.Header>
                        {
                            profilePath || profileUser ?
                                <React.Fragment>
                                    <h3 className="card__subtitle">{account.fullName}</h3>
                                </React.Fragment>
                            :
                                <React.Fragment>
                                    <Card.Title className="card__title">Welcome</Card.Title>
                                    <h3 className="card__subtitle">{account.fullName}</h3>
                                </React.Fragment>
                        }
                    </Card.Header>
                </div>
                <Card.Body>
                    {profileUser &&
                        <div className={ followed ? 'post__link post__link-pos text-success' : 'post__link post__link-pos'} onClick={handleFollowing}>
                            <span className="post__icon">
                                {followed? <MdPlaylistAddCheck /> : < MdPlaylistAdd />}
                            </span>
                            <span>{followed ? 'Following' : 'Follow'}</span>
                        </div>
                    }

                    <ul className={profilePath || profileUser ? "list-unstyled list list__inline" : "list-unstyled list"}>
                        {!profileUser && 
                            <Media as="li" className={`list__item list__item--mb ${profilePath? 'profile__list' : ''}`}>
                                <div className="mr-3 form__icon">
                                    <FaEnvelope />
                                </div>
                                <Media.Body className="list__body">{account.email}</Media.Body>
                            </Media>
                        }

                        {account.age &&
                            <Media as="li" className={`list__item list__item--mb ${profilePath ? 'profile__list' : profileUser? 'profile__list profile-another': ''}`}>
                                <div className="mr-3 form__icon">
                                    <AiFillCalendar />
                                </div>
                                <Media.Body className="list__body"> {account.age} Years old</Media.Body>
                            </Media>
                        }

                        <Media as="li" className={`list__item list__item--mb ${profilePath ? 'profile__list' : profileUser? 'profile__list profile-another': ''}`}>
                            <div className="mr-3 form__icon">
                                <FaAddressBook />
                            </div>
                            <Media.Body className="list__body">{account.address}</Media.Body>
                        </Media>

                        { (profileUser || profilePath) &&
                            <Media as="li" className={`list__item list__item--mb ${profilePath ? 'profile__list' : profileUser? 'profile__list profile-another': ''}`}>
                                <div className="mr-3 form__icon">
                                    <FaBlog />
                                </div>
                                <Media.Body className="list__body"> {blogsTotal} Blogs</Media.Body>
                            </Media>
                        }

                        {!profileUser && profilePath &&
                            <Link to="/following" className="link link--fw" style={{ display: 'contents'}}>
                                <Media as="li" className={`list__item list__item--mb ${profilePath ? 'profile__list' : ''}`}>
                                        <React.Fragment>
                                            <div className="mr-3 form__icon">
                                                <RiUserFollowLine />
                                            </div>
                                            <Media.Body className="list__body"> {account.following?.length} Following</Media.Body>
    
                                        </React.Fragment>
                                </Media>
                            </Link>
                        }
                        {profileUser && !profilePath &&
                            <Media as="li" className={`list__item list__item--mb ${profilePath ? 'profile__list' : profileUser? 'profile__list profile-another': ''}`}>
                                <div className="mr-3 form__icon">
                                    <RiUserFollowLine />
                                </div>
                                <Media.Body className="list__body"> {account.following?.length} Following</Media.Body>
                            </Media>
                        }

                        {!profileUser && profilePath &&
                            <Link to="/followers" className="link link--fw">
                                <Media as="li" className={`list__item list__item--mb ${profilePath ? 'profile__list' : ''}`}>
                                    <div className="mr-3 form__icon">
                                        <GiShadowFollower />
                                    </div>
                                    <Media.Body className="list__body"> {followers?.length} {followers?.length === 1 ? 'Follower' : 'Followers'}</Media.Body>
                                </Media>
                            </Link>
                        }
                    </ul>
                </Card.Body>
            </Card>
        </React.Fragment>
    );
}
 
export default InformationCard;

