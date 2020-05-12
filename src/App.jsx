import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

import authorizationToken from './services/tokenService';
import * as BlogService from './services/blogService';
import * as AuthorService from './services/authorService';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

import LogIn from './components/Authentication/login';
import Registration from './components/Authentication/registeration';
import Home from './components/home';
import Profile from './components/profile';
import Page404 from './components/page404';
import Following from './components/following';
import Followers from './components/followers';
import Search from './components/search';

class App extends Component {
  state = { 
    isTokenExist: Boolean,
    account: {},

    isShow: false,
    isValid: false,

    blogs: [],
    blogId: Number,
    blog: {}

  }

  async componentDidMount() {
    // Give all posts
    
    var { data: blogs } = await BlogService.getAll();

    const jwt = localStorage.getItem('JWT');
    const isTokenExist = authorizationToken(jwt);

    if(isTokenExist) 
        var { data: account } = await AuthorService.getProfile();

    this.setState({ isTokenExist, account, blogs });
    // this.setState({ isTokenExist });
  }

  handleModal = (bool, blogId) => {
    const isShow = bool;
    var { blog } = this.state;

    // Edit
    if (blogId) {
        blog = this.state.blogs.filter(blog => blog._id === blogId)[0];
    } else {
        blog.title = '';
        blog.body = '';
        blog.tag = '';
        blog.tags = [];
    }
    this.setState({ isShow, blogId, blog });
  }

  handleChange = e => {
    let { tag, isValid, blog } = this.state;

    if (Array.isArray(blog[e.target.name])) {
        blog['tag'] = e.target.value;
        tag = e.target.value;

        if( e.which === 13) {
          this.handleAddTag()
        }

    } else
        blog[e.target.name] = e.target.value;

    if (blog.title === '' || blog.body === '')
        isValid = false;
    else 
        isValid = true;
    this.setState({ tag, isValid });
  }

  handleAddTag = () => {
    const blog = this.state.blog;

    if (blog.tag !== '')
        blog['tags'].push(blog.tag);

    blog.tag = ' ';
    this.setState({ blog });
  }

  handleDeleteTag = ({ target }) => {
    const blog = this.state.blog;
    const id = target.dataset.id;
    blog.tags.splice(id, 1);
    this.setState({ blog })
  }

  handleBlog = async blog => {
    const isShow = false;

    // Edit
    if (this.state.blogId) {
      toast.success('The blog is changed successfully');
      await BlogService.update(blog._id, blog);
    } else {
      blog.authorId = this.state.account._id;
      await BlogService.post(blog);
    }
    this.setState({ isShow, blog });
  }

  handleDeleteBlog = async id => {
      let blogs = this.state.blogs.filter(blog => blog._id !== id);
      await BlogService.remove(id);
      this.setState({ blogs });
  }

  showUserProfile = async id => {
    await AuthorService.getById(id);
  }

  render() { 
    const { isTokenExist, account, isShow, isValid, blog, blogs } = this.state;

    return ( 
      <React.Fragment>
        <ToastContainer />

        <div className="layout">
            <Switch>
              <Route path="/auth/login" component={LogIn}/>
              <Route path="/auth/registration" component={Registration} />

                <Route path="/home" render = { props =>
                  <Home 
                    {...props}
                    blog = {blog}
                    blogs = {blogs}
                    account = {account}
                    isShow = {isShow}
                    isValid = {isValid}
                    isTokenExist = {isTokenExist}
                    showUserProfile = {this.showUserProfile}
                    handleBlog = {this.handleBlog}
                    handleModal = {this.handleModal}
                    handleChange = {this.handleChange}
                    handleAddTag = {this.handleAddTag}
                    handleDeleteTag = {this.handleDeleteTag}
                    handleDeleteBlog = {this.handleDeleteBlog}
                  />
                }/>

                <Route path="/profile/:id" render = { props =>
                  <Profile 
                    {...props}
                    blog = {blog}
                    currentId = {account?._id}
                  />
                }/>
                <Route path="/profile" render = { props =>
                  <Profile 
                    {...props}
                    blog = {blog}
                    isShow = {isShow}
                    isValid = {isValid}
                    
                    handleBlog = {this.handleBlog}
                    handleModal = {this.handleModal}
                    handleChange = {this.handleChange}
                    handleAddTag = {this.handleAddTag}
                    handleDeleteTag = {this.handleDeleteTag}
                    handleDeleteBlog = {this.handleDeleteBlog}
                  />
                }/>

                <Route path="/search" render = { props =>
                  <Search 
                    {...props}
                    isTokenExist = {this.isTokenExist}
                  />
                }/>

                <Route path="/following" component={Following} />
                <Route path="/followers" component={Followers} />

                <Route path="/page404" component={Page404} />

                <Redirect from="/" to="/home" exact />
                <Redirect to="/page404" />
              </Switch>
            </div>
      </React.Fragment>

    );
  }
}

axios.interceptors.response.use(null, error => {
  if (!(error.response && error.response.status >= 400 && error.response.status < 500))
    toast.error('Sorry, We have problem on the network');

    return Promise.reject(error);
});
 
export default App;
