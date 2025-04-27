import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./Header.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { LoaderContext } from '../../Context';
import { auth } from "../../firebase.js";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context';


const Header = () => {
    const Navigate = useNavigate();
    const Loader = useContext(LoaderContext);
    const currentUser = useContext(UserContext);

    async function logout() {
        try {
            currentUser.setUser({
                email: null,
                id: null,
                loggedIn: false
            });
            await auth.signOut();
            console.log("Logged out successfully")

            Navigate("/");
        }
        catch (err) {
            console.log(err);
        }
    }



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
                    <RxHamburgerMenu className='text-white' />

                </button>
                <div className="collapse navbar-collapse" id="navbarNav">


                    {(currentUser.user.loggedIn) ?

                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <span className="nav-link text-color" style={{textDecoration: "None", cursor: "default"}} >{currentUser.user.name}</span>
                            </li>
                            <li className="nav-item">
                                <img src="/user.png" alt="user-graphic" style={{"width": "3vw"}}/>
                            </li>
                        </ul>

                        :

                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link text-color" to='/login' >Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-color" to="/signup" >Signup</Link>
                            </li>
                        </ul>

                    }

                </div>
            </div>
        </nav>
    );
}

export default Header
