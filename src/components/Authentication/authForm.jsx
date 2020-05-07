import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { FaUser, FaUnlockAlt, FaEnvelope, FaAddressBook } from "react-icons/fa";
import { AiFillCalendar } from 'react-icons/ai';
import { BsArrowLeftShort } from 'react-icons/bs';

const AuthForm = ({account, errors, handleChange, handleSubmit, match}) => {
    return ( 
        <React.Fragment>
            <ToastContainer />

            <div className="auth--bg">
            <div className={`auth ${match.path === '/auth/registration'? 'auth-regist' : ''}`}>
                <form className="form">
                    <div className="form__logo">
                        <div className="form__logo-bg">
                            <div className="form__logo-icon">
                                <FaUser />
                            </div>    
                        </div>
                    </div>
                    {match.path === '/auth/login' &&
                        <React.Fragment>
                            <div className="form__group">
                                <div className="form__icon form__icon-pos">
                                    <FaEnvelope />
                                </div>    
                                <input type="text" className={`form__control form__control--pad ${errors.email ? 'errorMsg-border' : ''}`} value={account.email} onChange={handleChange} onBlur={handleChange} name="email" id="email" placeholder="Email" autoComplete="off"/>
                                <div className="errorMsg">{errors.email}</div>
                            </div>
                            <div className="form__group">
                                <div className="form__icon form__icon-pos">
                                    <FaUnlockAlt />
                                </div> 
                                <input type="password" className={`form__control form__control--pad ${errors.password ? 'errorMsg-border' : ''}`} value={account.password} onChange={handleChange} onBlur={handleChange} name="password" id="password" placeholder="Password"/>
                                <div className="errorMsg">{errors.password}</div>
                            </div>
                            
                            <button className="btn btn--full btn--primary text--lg text--upper auth__submit" onClick={handleSubmit}>Login</button>
                        </React.Fragment>
                    }
                    {match.path === '/auth/registration' &&
                        <React.Fragment>
                            <div className="form__group">
                                <div className="form__icon form__icon-pos">
                                    <FaUser />
                                </div>    
                                <input type="text" className={`form__control form__control--pad ${errors.fullName ? 'errorMsg-border' : ''}`} value={account.fullName} onChange={handleChange} onBlur={handleChange} name="fullName" id="fullName" placeholder="Full Name" autoComplete="off"/>
                                <div className="errorMsg">{errors.fullName}</div>
                            </div>
                            <div className="form__group">
                                <div className="form__icon form__icon-pos">
                                    <FaEnvelope />
                                </div>    
                                <input type="text" className={`form__control form__control--pad ${errors.email ? 'errorMsg-border' : ''}`} value={account.email} onChange={handleChange} onBlur={handleChange} name="email" id="email" placeholder="Email" autoComplete="off"/>
                                <div className="errorMsg">{errors.email}</div>
                            </div>
                            <div className="form__group">
                                <div className="form__icon form__icon-pos">
                                    <FaUnlockAlt />
                                </div> 
                                <input type="password" className={`form__control form__control--pad ${errors.password ? 'errorMsg-border' : ''}`} value={account.password} onChange={handleChange} onBlur={handleChange} name="password" id="password" placeholder="Password"/>
                                <div className="errorMsg">{errors.password}</div>
                            </div>
                            <div className="form__group">
                                <div className="form__icon form__icon-pos">
                                    <AiFillCalendar />
                                </div>    
                                <input type="number" min="10" max="60" className={`form__control form__control--pad ${errors.age ? 'errorMsg-border' : ''}`} value={Number(account.age)} onChange={handleChange} name="age" id="age" placeholder="Age"/>
                                <div className="errorMsg">{errors.age}</div>
                            </div>
                            <div className="form__group">
                                <div className="form__icon form__icon-pos">
                                    <FaAddressBook />
                                </div>    
                                <textarea className={`form__control form__control--pad ${errors.address ? 'errorMsg-border' : ''}`} value={account.address} onChange={handleChange} name="address" id="address" placeholder="Address"></textarea>
                                <div className="errorMsg">{errors.address}</div>
                            </div>
                            
                            <button className="btn btn--full btn--primary text--lg text--upper auth__submit" onClick={handleSubmit}>SignUp</button>
                        </React.Fragment>
                    }
                </form>

                {match.path === '/auth/login' && <p className="auth__text">Don't have an account? <Link to="/auth/registration" className="link link--secondary text--upper">Register Here</Link></p>}
                {match.path === '/auth/registration' && <p className="auth__text">Do you have an account? <Link to="/auth/login" className="link link--secondary text--upper">Login Here</Link></p>}

                <p className="auth__text">
                    <Link to="/home" className="link link--secondary"> <BsArrowLeftShort /> Back to home</Link>
                </p>
            </div>
            </div>
        </React.Fragment>
    );
}
 
export default AuthForm;
