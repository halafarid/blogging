import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiLogOut, FiSearch } from 'react-icons/fi';

import { LogOut } from './../services/authService';


const Navigation = props => {
    return ( 
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="navbar">
                <div className="container-fluid">
                    <Navbar.Brand as={Link} to="/">Logo</Navbar.Brand>
                    {props.isTokenExist && <Nav.Link className={props.location.pathname === '/search'? 'navbar__link active' : 'navbar__link'} as={Link} to="/search"> <FiSearch /> </Nav.Link>}
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">

                            {props.isTokenExist ? 
                                <React.Fragment>
                                    <Nav.Link className={props.location.pathname === '/home'? 'navbar__link active' : 'navbar__link'} as={Link} to="/home">Home</Nav.Link>
                                    <Nav.Link className={props.location.pathname === '/profile'? 'navbar__link active' : 'navbar__link'} as={Link} to="/profile">Profile</Nav.Link>
                                    <Nav.Link className={props.location.pathname === '/following'? 'navbar__link active' : 'navbar__link'} as={Link} to="/following">Following</Nav.Link>
                                    <Nav.Link className={props.location.pathname === '/followers'? 'navbar__link active' : 'navbar__link'} as={Link} to="/followers">Followers</Nav.Link>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <Nav.Link className={props.location.pathname === '/home'? 'navbar__link active' : 'navbar__link'} as={Link} to="/home">Home</Nav.Link>
                                    <Nav.Link className={props.location.pathname === '/auth/login'? 'navbar__link active' : 'navbar__link'} as={Link} to="/auth/login">Log In</Nav.Link>
                                    <Nav.Link className={props.location.pathname === '/auth/registration'? 'navbar__link active' : 'navbar__link'} as={Link} to="/auth/registration">Sign Up</Nav.Link>
                                </React.Fragment>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </div>
                {props.isTokenExist && 
                    <Nav.Link className="navbar__link navbar__link-logout" as={Link} to="/auth/login" onClick={LogOut}>
                        <FiLogOut />
                    </Nav.Link>
                }
            </Navbar>
        </React.Fragment>
    );
}
 
export default Navigation;