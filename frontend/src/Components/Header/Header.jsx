import React from 'react'
import { Link } from 'react-router-dom';
import "./Header.css";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
    return (
        <nav className="navbar navbar-expand-md background-color">
            <div className="container-fluid">
                <Link className="navbar-brand text-color" to="/">Interviewer AI</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <RxHamburgerMenu className='text-white'/>
                    
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link text-color" aria-current="page" to="/about-us">About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-color" to="/contact-us">Contact Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-color" to="/login">Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header
