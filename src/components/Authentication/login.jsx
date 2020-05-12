import React, { Component } from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';

import * as authService from '../../services/authService';
import authorizationToken from '../../services/tokenService';
import AuthForm from './authForm';

class LogIn extends Component {
    state = {  
        account: {email: '', password: ''},
        errors: {},
    }

    schema = {
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().min(6).label('Password')
    }

    render() { 
        return ( 
            <React.Fragment>
                <AuthForm 
                    {...this.props}
                    account = {this.state.account}
                    errors = {this.state.errors}
                    handleChange = {this.handleChange}
                    handleSubmit = {this.handleSubmit}
                />
            </React.Fragment> 
        );
    }
        
    handleChange = ({ currentTarget }) => {
        const account = {...this.state.account};
        account[currentTarget.name] = currentTarget.value;

        const errors = {...this.state.errors};
        delete errors[currentTarget.name];

        this.setState({ account, errors });
    }

    validation = () => {
        const errors = {};
        const result = Joi.validate(this.state.account, this.schema, { abortEarly: false });

        if (result.error == null) return null;
        
        for (const error of result.error.details) {
            if (!Object.keys(errors).includes(error.path[0]))
                errors[error.path] = error.message;
        }
        return errors;
    }

    handleSubmit = async e => {
        e.preventDefault();
        const errors = this.validation();

        if (errors) {
            this.setState({ errors });
            return;
        }

        // call backend
        try {
            const { data } = await authService.Login(this.state.account);
            console.log(data);

            localStorage.setItem('JWT', data.token);
            authorizationToken(data.token);

            this.props.history.replace('/profile');

        } catch (err) {
            if (err.response && err.response.status >= 400)
                toast.error('Sorry, Email or Password is incorrect!.');
        }
    }
}
 
export default LogIn;