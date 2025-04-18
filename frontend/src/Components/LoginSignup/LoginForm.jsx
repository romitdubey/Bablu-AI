import React, { useState } from 'react';
import './LoginSignupform.css';

const LoginForm = ({ showLogin, setShowLogin }) => {
    const [formData, setFormData] = useState({
        name: '',
        number: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log(formData);
    };

    return (<>

        <div className="container">
            <div className="row">

                <div className="col-md-6" style={{ margin: "auto" }}>
                    <h3 className="text-center mb-4">Login</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="loginEmail" className="form-control" id="loginEmail" name="loginEmail" placeholder='Enter Email' value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="loginPassword" className="form-label">Password</label>
                            <input type="password" className="form-control" id="loginPassword" name="loginPassword" placeholder='Enter Password' value={formData.password} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </form>
                    <p className="mt-3 text-center">
                        Don't have an account? 
                        <button className="cool-btn" onClick={()=>setShowLogin(!showLogin)}>Sign Up</button>
                    </p>
                </div>

                <div className='col-md-6 signup-img'>
                    <img src="/signup.png" alt="Signup" className='img-fluid' />
                </div>

            </div>
        </div>
    </>
    );
};

export default LoginForm;
