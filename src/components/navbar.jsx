import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation = props => {
    return ( 
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="navbar">
                <div className="container-fluid">
                    <Navbar.Brand as={Link} to="/">Logo</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link className={props.location.pathname === '/home'? 'navbar__link active' : 'navbar__link'} as={Link} to="/home">Home</Nav.Link>
                            <Nav.Link className={props.location.pathname === '/profile'? 'navbar__link active' : 'navbar__link'} as={Link} to="/profile">Profile</Nav.Link>
                            <Nav.Link className={props.location.pathname === '/following'? 'navbar__link active' : 'navbar__link'} as={Link} to="/following">Following</Nav.Link>
                            <Nav.Link className={props.location.pathname === '/followers'? 'navbar__link active' : 'navbar__link'} as={Link} to="/followers">Followers</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </div>
                <Nav.Link className="navbar__link" href="#">Logout</Nav.Link>
            </Navbar>
        </React.Fragment>
    );
}
 
export default Navigation;