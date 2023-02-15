import React, { useState, useEffect } from "react";
import Router from "next/router";
import { authenticate, signin, isAuth } from "../../actions/auth";

const SigninComponent = () => {
    const [values, setValues] = useState({
        email: 'firn@fm.se',
        password: '2093ue023j',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const { email, password, error, loading, message, showForm} = values;

    useEffect(() => {
        isAuth() && Router.push(`/`) 
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({...values, loading: true, error: false});
        const user = { email, password };

        signin(user).then(data => {
            console.log(data)
            if (data.error) {
                setValues({...values, error: data.error, loading: false})
            } else {
                // save user token to cookie
                // save user info to localstorage
                // authenticate user
                authenticate(data, () => {
                    if(isAuth() && isAuth().role === 1){
                        Router.push('/admin');
                    } else {
                        Router.push('/user');
                    }
                })
            }
        });
    };

    const handleChange = email => e => {
        setValues({ ...values, error: false, [email]: e.target.value });
    };

    const showLoading = () => ( loading ? <div className="alert alert-info">Loading ...</div> : '');
    const showError = () => ( error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => ( message ? <div className="alert alert-info">{message}</div> : '' );

    const signinForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input value={email} onChange={handleChange('email')} type="email" className="form-control mb-3" placeholder="Type your email" />

                    <input value={password} onChange={handleChange('password')} type="password" className="form-control mb-3" placeholder="Type your password" />
                </div>
                <div>
                    <button className="btn btn-primary">SignIn</button>
                </div>
            </form>
        )
    }

    return (
        <React.Fragment>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signinForm()}
        </React.Fragment>
    )
}

export default SigninComponent;