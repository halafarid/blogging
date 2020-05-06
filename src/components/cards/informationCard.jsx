import React from 'react';
import { Card, Media } from 'react-bootstrap';
import { FaEnvelope, FaBlog, FaAddressBook} from "react-icons/fa";
import { AiFillCalendar } from 'react-icons/ai';
import { RiUserFollowLine } from 'react-icons/ri';
import { GiShadowFollower } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const InformationCard = ({ account, match }) => {
    const profilePath = match.path === '/profile';
    const profileUser = match.path === '/profile/:id';

    return ( 
        <React.Fragment>
            <Card className={profilePath || profileUser ? "card profile__card" : "card card__home"}>
                <div className="card__header-img">
                    <Card.Body>
                        {
                            profilePath ?
                                <React.Fragment>
                                    <h3 className="card__title">Personal Information</h3>
                                </React.Fragment>
                            :
                            profileUser ?
                                <React.Fragment>
                                    <h3 className="card__title">{account.fullName}</h3>
                                </React.Fragment>
                            :
                                <React.Fragment>
                                    <Card.Title className="card__top">Welcome</Card.Title>
                                    <h3 className="card__title">Hala Farid</h3>
                                </React.Fragment>
                        }
                    </Card.Body>
                </div>
                <Card.Body>
                    <ul className={profilePath || profileUser ? "list-unstyled list list__inline" : "list-unstyled list"}>
                        {!profileUser && 
                            <Media as="li" className={profilePath ? "list__item list__item--mb profile__list" : "list__item list__item--mb"}>
                                <div className="mr-3 form__icon">
                                    <FaEnvelope />
                                </div>
                                <Media.Body className="list__body"> hala@gmail.com</Media.Body>
                            </Media>
                        }

                        <Media as="li" className={profilePath || profileUser ? "list__item list__item--mb profile__list" : "list__item list__item--mb"}>
                            <div className="mr-3 form__icon">
                                <FaAddressBook />
                            </div>
                            <Media.Body className="list__body"> Cairo, Mansoura</Media.Body>
                        </Media>

                        <Media as="li" className={profilePath || profileUser ? "list__item list__item--mb profile__list" : "list__item list__item--mb"}>
                            <div className="mr-3 form__icon">
                                <AiFillCalendar />
                            </div>
                            {/* <Media.Body className="list__body"> {account.age} Years old</Media.Body> */}
                            <Media.Body className="list__body"> 20 Years old</Media.Body>
                        </Media>

                        <Media as="li" className={profilePath || profileUser ? "list__item list__item--mb profile__list" : "list__item list__item--mb"}>
                            <div className="mr-3 form__icon">
                                <FaBlog />
                            </div>
                            <Media.Body className="list__body"> 30 Blogs</Media.Body>
                        </Media>

                        {!profileUser && 
                            <Link to="/following" className="link" style={{ display: 'contents'}}>
                                <Media as="li" className={profilePath ? "list__item list__item--mb profile__list" : "list__item list__item--mb"}>
                                    <div className="mr-3 form__icon">
                                        <RiUserFollowLine />
                                    </div>
                                    <Media.Body className="list__body"> 10 Following</Media.Body>
                                </Media>
                            </Link>
                        }

                        {!profileUser && 
                            <Link to="/followers" className="link">
                                <Media as="li" className={profilePath ? "list__item list__item--mb profile__list" : "list__item list__item--mb"}>
                                    <div className="mr-3 form__icon">
                                        <GiShadowFollower />
                                    </div>
                                    <Media.Body className="list__body"> 20 Followers</Media.Body>
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
