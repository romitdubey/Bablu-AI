import React, { useState } from 'react';
import './LoginSignupform.css';
import { auth } from "../../firebase.js"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const SignupForm = ({showLogin, setShowLogin}) => {

  const Navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);    
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try{
      const userCred = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      console.log(userCred);
      Navigate("/login");
    }
    catch(err){
      console.log(err);
      alert("Signup Failed! Please check your credentials.");
    }
    

  };

  return (<>
    <div className="container">
      <div className="row">

        <div className='col-md-6 signup-img'>
          <img src="/signup.png" alt="Signup" className='img-fluid' />
        </div>
        <div className="col-md-6">
          <h3 className="text-center mb-4">Sign Up</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input type="text" className="form-control" id="name" name="name" placeholder='Enter Name' value={formData.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="number" className="form-label">Number</label>
              <input type="number" className="form-control" id="number" name="number" placeholder='Enter Number' value={formData.number} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" name="email" placeholder='Enter Email' value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" name="password" placeholder='Enter Password' value={formData.password} onChange={handleChange} minLength={6} required />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder='Confirm Password' value={formData.confirmPassword} onChange={handleChange} minLength={6} required />
            </div>
            <button type="submit" className="btn btn-primary w-100">Create Account</button>
          </form>
          <p className="mt-3 text-center">
            Already have an account? 
            <button className="cool-btn" onClick={()=>setShowLogin(!showLogin)}>Log in</button>
          </p>
        </div>

      </div>
    </div>
  </>
  );
};

export default SignupForm;
