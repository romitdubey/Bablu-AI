import React, { useState } from 'react';
import './LoginSignupform.css';
import { auth } from "../../firebase.js";
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginForm = ({ showLogin, setShowLogin }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);
        try{
            const userCred = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            console.log("Successfully logged in", userCred);
            localStorage.setItem("UserCred", JSON.stringify(userCred));
            navigate("/dashboard");
            
        }catch(err){
            console.log(err);
            alert("Login Failed! Please check your credentials.");
        }


    };

    return (<>

        <div className="container">
            <div className="row">

                <div className="col-md-6" style={{ margin: "auto" }}>
                    <h3 className="text-center mb-4">Login</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="loginEmail" name="email" placeholder='Enter Email' value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="loginPassword" className="form-label">Password</label>
                            <input type="password" className="form-control" id="loginPassword" name="password" placeholder='Enter Password' value={formData.password} onChange={handleChange} minLength={6} required />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </form>
                    <p className="mt-3 text-center">
                        Don't have an account?
                        <button className="cool-btn" onClick={() => setShowLogin(!showLogin)}>Sign Up</button>
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
