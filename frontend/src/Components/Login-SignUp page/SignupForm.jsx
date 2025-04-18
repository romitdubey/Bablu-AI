import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignupForm = () => {
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
        <div className="col-md-5">
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
              <input type="password" className="form-control" id="password" name="password" placeholder='Enter Password' value={formData.password} onChange={handleChange} required />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder='Confirm Password' value={formData.confirmPassword} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary w-100">Create Account</button>
          </form>
          <p className="mt-3 text-center">
            Already have an account? <Link href="#">Log In</Link>
          </p>
        </div>
        <div className="col-md-5">
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
              <input type="password" className="form-control" id="password" name="password" placeholder='Enter Password' value={formData.password} onChange={handleChange} required />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder='Confirm Password' value={formData.confirmPassword} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary w-100">Create Account</button>
          </form>
          <p className="mt-3 text-center">
            Already have an account? <Link href="#">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  </>
  );
};

export default SignupForm;
