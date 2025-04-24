import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import "./Header.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { LoaderContext } from '../../context/loaderContext';


const Header = () => {
    const Loader = useContext(LoaderContext);
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
                            {/* <Link className="nav-link text-color" aria-current="page" to="/dashboard">Dashboard</Link> */}
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link text-color" to='/login' >Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-color" to="/signup" >Signup</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header
