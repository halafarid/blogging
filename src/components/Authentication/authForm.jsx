import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaUnlockAlt, FaEnvelope } from "react-icons/fa";
import { AiFillCalendar } from 'react-icons/ai';
import { ToastContainer } from 'react-toastify';

const AuthForm = ({account, errors, handleChange, handleSubmit, match}) => {
    return ( 
        <React.Fragment>
            <ToastContainer />

            <div className="layout">
                <div className="auth">
                    <form className="form">
                        <div className="form__logo">
                            <div className="form__logo-bg">
                                <div className="form__logo-icon">
                                    <FaUser />
                                </div>    
                            </div>
                        </div>
                        {match.path === '/auth/login' &&
                            <div>
                                <div className="form__group">
                                    <div className="form__icon form__icon-pos">
                                        <FaEnvelope />
                                    </div>    
                                    <input type="text" className={errors.email ? 'form__control form__control--pad errorMsg-border' : 'form__control form__control--pad'} value={account.email} onChange={handleChange} onBlur={handleChange} name="email" id="email" placeholder="Email" autoComplete="off"/>
                                    <div className="errorMsg">{errors.email}</div>
                                </div>
                                <div className="form__group">
                                    <div className="form__icon form__icon-pos">
                                        <FaUnlockAlt />
                                    </div> 
                                    <input type="password" className={errors.password ? 'form__control form__control--pad errorMsg-border' : 'form__control form__control--pad'} value={account.password} onChange={handleChange} onBlur={handleChange} name="password" id="password" placeholder="Password"/>
                                    <div className="errorMsg">{errors.password}</div>
                                </div>
                                
                                <button className="btn btn--full btn--primary text--lg text--upper auth__submit" onClick={handleSubmit}>Login</button>
                            </div>
                        }
                        {match.path === '/auth/registration' &&
                            <div>
                                <div className="form__group">
                                    <div className="form__icon form__icon-pos">
                                        <FaUser />
                                    </div>    
                                    <input type="text" className={errors.fullName ? 'form__control form__control--pad errorMsg-border' : 'form__control form__control--pad'} value={account.fullName} onChange={handleChange} onBlur={handleChange} name="fullName" id="fullName" placeholder="Full Name" autoComplete="off"/>
                                    <div className="errorMsg">{errors.fullName}</div>
                                </div>
                                <div className="form__group">
                                    <div className="form__icon form__icon-pos">
                                        <FaEnvelope />
                                    </div>    
                                    <input type="text" className={errors.email ? 'form__control form__control--pad errorMsg-border' : 'form__control form__control--pad'} value={account.email} onChange={handleChange} onBlur={handleChange} name="email" id="email" placeholder="Email" autoComplete="off"/>
                                    <div className="errorMsg">{errors.email}</div>
                                </div>
                                <div className="form__group">
                                    <div className="form__icon form__icon-pos">
                                        <FaUnlockAlt />
                                    </div> 
                                    <input type="password" className={errors.password ? 'form__control form__control--pad errorMsg-border' : 'form__control form__control--pad'} value={account.password} onChange={handleChange} onBlur={handleChange} name="password" id="password" placeholder="Password"/>
                                    <div className="errorMsg">{errors.password}</div>
                                </div>
                                <div className="form__group">
                                    <div className="form__icon form__icon-pos">
                                        <AiFillCalendar />
                                    </div>    
                                    <input type="number" min="10" max="60" className={errors.age ? 'form__control form__control--pad errorMsg-border' : 'form__control form__control--pad'} value={Number(account.age)} onChange={handleChange} name="age" id="age" placeholder="Age"/>
                                    <div className="errorMsg">{errors.age}</div>
                                </div>
                                
                                <button className="btn btn--full btn--primary text--lg text--upper auth__submit" onClick={handleSubmit}>SignUp</button>
                            </div>
                        }
                    </form>

                    {match.path === '/auth/login' && <p className="auth__text">Don't have an account? <Link to="/auth/registration" className="link link--light text--upper">Register Here</Link></p>}
                    {match.path === '/auth/registration' && <p className="auth__text">Do you have an account? <Link to="/auth/login" className="link link--light text--upper">Login Here</Link></p>}
                </div>
            </div>
        </React.Fragment>
    );
}
 
export default AuthForm;
