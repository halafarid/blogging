import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import authorizationToken from '../services/tokenService';
import * as AuthorService from '../services/authorService';

import Navigation from './navbar';
import BlogsCards from './cards/blogsCards';
import InformationCard from './cards/informationCard';
import CreateBlogCard from './cards/createBlogCard';

class Home extends Component {
    state = { 
        account: {}
    }

    async componentDidMount() {
        const jwt = localStorage.getItem('JWT');
        const isTokenExist = authorizationToken(jwt);

        if(isTokenExist) 
            var { data: account } = await AuthorService.getProfile();
    
        this.setState({ isTokenExist, account });
    }    

    render() { 
    const { blogs, blog, isShow, isValid, showUserProfile, handleModal, handleChange, handleAddTag, handleDeleteTag, handleBlog, handleDeleteBlog } = this.props;
    const { isTokenExist, account } = this.state;

    return ( 
        <React.Fragment>
            <ToastContainer />

            <Navigation 
                {...this.props}
                isTokenExist = {isTokenExist}
            />

            <div className="container">
                <Row>
                    <Col md={3}>
                        <img src={require("../images/advertising.jpg")} alt="Advertising" className="advertising"/>

                        {isTokenExist &&
                            <InformationCard
                                {...this.props}
                                isTokenExist = {isTokenExist}
                                account = {account}
                            />
                        }
                    </Col>

                    <Col md={9}>

                        {isTokenExist && 
                            <React.Fragment>
                                <CreateBlogCard 
                                    blog = {blog}
                                    isShow = {isShow}
                                    isValid = {isValid}

                                    handleModal = {handleModal}
                                    handleBlog = {handleBlog}
                                    handleChange = {handleChange}
                                    handleAddTag = {handleAddTag}
                                    handleDeleteTag = {handleDeleteTag}
                                />

                                <hr className="horizontal" />
                            </React.Fragment>
                        }

                        {blogs.map(blog => (
                            <BlogsCards
                                { ...this.props }
                                key = {blog._id}
                                blog = {blog}
                                currentId = {account?._id}
                                isTokenExist = {isTokenExist}
                                showUserProfile = {showUserProfile}

                                isShow = {isShow}
                                handleModal = {handleModal}
                                handleBlog = {handleBlog}
                                handleDeleteBlog = {handleDeleteBlog}
                            />
                        ))}
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
    }
}
 
export default Home;

// const Home = props => {
//     const { isTokenExist, account, blogs, blog, isShow, isValid, showUserProfile, handleModal, handleChange, handleAddTag, handleDeleteTag, handleBlog, handleDeleteBlog } = props;

//     return ( 
//         <React.Fragment>
//             <ToastContainer />

//             <Navigation 
//                 {...props}
//                 isTokenExist = {isTokenExist}
//             />

//             <div className="container">
//                 <Row>
//                     <Col md={3}>
//                         <img src={require("../images/advertising.jpg")} alt="Advertising" className="advertising"/>

//                         {isTokenExist &&
//                             <InformationCard
//                                 {...props}
//                                 isTokenExist = {isTokenExist}
//                                 account = {account}
//                             />
//                         }
//                     </Col>

//                     <Col md={9}>

//                         {isTokenExist && 
//                             <React.Fragment>
//                                 <CreateBlogCard 
//                                     blog = {blog}
//                                     isShow = {isShow}
//                                     isValid = {isValid}

//                                     handleModal = {handleModal}
//                                     handleBlog = {handleBlog}
//                                     handleChange = {handleChange}
//                                     handleAddTag = {handleAddTag}
//                                     handleDeleteTag = {handleDeleteTag}
//                                 />

//                                 <hr className="horizontal" />
//                             </React.Fragment>
//                         }

//                         {blogs.map(blog => (
//                             <BlogsCards
//                                 { ...props }
//                                 key = {blog._id}
//                                 blog = {blog}
//                                 currentId = {account?._id}
//                                 isTokenExist = {isTokenExist}
//                                 showUserProfile = {showUserProfile}

//                                 isShow = {isShow}
//                                 handleModal = {handleModal}
//                                 handleBlog = {handleBlog}
//                                 handleDeleteBlog = {handleDeleteBlog}
//                             />
//                         ))}
//                     </Col>
//                 </Row>
//             </div>
//         </React.Fragment>
//     );
// }
 
// export default Home;