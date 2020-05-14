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
    blogObj: {},
    blog: {},

    pageNo: 1,
    size: 5,
    pageSize: 5,

    loading: false
  }

  async componentDidMount() {
    const { pageNo, size } = this.state;

    var { data: blogs } = await BlogService.getAll(pageNo, size);

    const jwt = localStorage.getItem('JWT');
    const isTokenExist = authorizationToken(jwt);

    if(isTokenExist) 
        var { data: account } = await AuthorService.getProfile();

    window.addEventListener('scroll', this.handleScroll, true);
    this.setState({ isTokenExist, account, blogs });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = async () => {
    let { pageNo, size, pageSize, loading } = this.state;
    if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight ) {
      size += pageSize;
      var { data: blogs } = await BlogService.getAll(pageNo, size);
      loading = false;
      this.setState({ size, blogs });
    } else {
      loading = true;
    }    
    this.setState({ loading });
  };

  handleModal = (bool, blogObj) => {
    const isShow = bool;
    var { blog } = this.state;

    // Edit
    if (blogObj) {
      blog = blogObj;
    } else {
      blog.title = '';
      blog.body = '';
      blog.tag = '';
      blog.tags = [];
    }
    this.setState({ isShow, blogObj, blog });
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
    const { blogs } = this.state;
    // Edit
    if (this.state.blogObj) {
      toast.success('The blog is changed successfully');
      await BlogService.update(blog._id, blog);
    } else {
      // blog.authorId = this.state.account._id;
      console.log(blog);
      blogs.unshift(blog);
      await BlogService.post(blog);
    }
    this.setState({ isShow, blog, blogs });
  }

  handleDeleteBlog = async blog => {
    let blogs = this.state.blogs.filter(b => b._id !== blog._id);
    await BlogService.remove(blog._id);
    this.setState({ blogs });
  }

  showUserProfile = async id => {
    await AuthorService.getById(id);
  }

  render() { 
    const { isTokenExist, account, isShow, isValid, blog, blogs, loading } = this.state;

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
                    isShow = {isShow}
                    isValid = {isValid}
                    loading = {loading}
                    account = {account}
                    isTokenExist = {isTokenExist}
                    handleBlog = {this.handleBlog}
                    handleModal = {this.handleModal}
                    handleChange = {this.handleChange}
                    handleAddTag = {this.handleAddTag}
                    handleDeleteTag = {this.handleDeleteTag}
                    handleDeleteBlog = {this.handleDeleteBlog}
                    showUserProfile = {this.showUserProfile}
                  />
                }/>

                <Route path="/profile/:id" render = { props =>
                  <Profile 
                    {...props}
                    blog = {blog}
                    loading = {loading}
                    currentId = {account?._id}
                    handleScroll = {this.handleScroll}
                  />
                }/>
                <Route path="/profile" render = { props =>
                  <Profile 
                    {...props}
                    blog = {blog}
                    isShow = {isShow}
                    isValid = {isValid}
                    loading = {loading}
                    handleScroll = {this.handleScroll}
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
