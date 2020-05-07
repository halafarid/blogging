import React, { Component } from 'react';
import Joi from 'joi-browser';
import { toast, ToastContainer } from 'react-toastify';

import * as authService from '../../services/authService';
import AuthForm from './authForm';

class Registration extends Component {
    state = { 
        account: {fullName: '', email: '', password: '', age: null, address: ''},
        errors: {},
    }
    
    schema = {
        fullName: Joi.string().required().label('Name'),
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().min(6).label('Password'),
        address: Joi.string().required().max(256).label('Address'),
        age: Joi.number().label('Age')
    }

    render() { 
        return ( 
            <React.Fragment>
                <ToastContainer />
                
                <AuthForm 
                    {...this.props}
                    account = {this.state.account}
                    errors = {this.state.errors}
                    schema = {this.schema}
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
        const account = {...this.state.account};
        const errors = this.validation();

        if (errors) {
            this.setState({ errors });
            return;
        }

        // call backend
        try {
            const { data } = await authService.Register(account);
            console.log(data)
    
            toast.success(`Welcome ${account.fullName}`);
    
            this.props.history.replace('/auth/login');

        } catch (ex) {
            if (ex.response && ex.response.status) return toast.error('This email is already exists!.');
        }
    }
}
 
export default Registration;