import React, { use, useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BiArrowFromLeft } from "react-icons/bi";

import './UserDashBoard.css'
import { useNavigate } from 'react-router-dom';

const UserDashBoard = () => {
    const Navigate = useNavigate();
    const [userNavWidth, setUserNavWidth] = useState(false);
    const dashBoardSlider = () => {
        if (userNavWidth == true) {
            setUserNavWidth(false);
        }
        else {
            setUserNavWidth(true);
        }
        console.log(userNavWidth)
    }
    const userLogout = () =>{
        Navigate("/");
    }
    return (
        <section className="user-dashbord">
            <div className=''>
                <div className="row">
                    <div className={(userNavWidth == true) ? "col-md-2 user-info " : "col-md-1 user-info"}>
                        {(userNavWidth == true) ?
                            <div>
                                <div className="user-head">
                                    <h2>Bablu</h2>
                                    <button onClick={dashBoardSlider} className='btn' >
                                        <FaChevronLeft className="user-dashboard-icon" />
                                    </button>
                                </div>
                                <div className="user-inner-info">
                                    <div>
                                        <BiArrowFromLeft className='fs-5 m-2' />
                                        <h6>demo1</h6>
                                    </div>
                                    <div>
                                        <BiArrowFromLeft className='fs-5 m-2' />
                                        <h6>demo1</h6>
                                    </div>
                                    <div>
                                        <BiArrowFromLeft className='fs-5 m-2' />
                                        <h6>demo1</h6>
                                    </div>
                                    <div>
                                        <BiArrowFromLeft className='fs-5 m-2' />
                                        <h6>demo1</h6>
                                    </div>
                                    <button className='btn btn-danger' onClick={userLogout}>Logout</button>
                                </div>
                            </div>
                            : <div onClick={dashBoardSlider}>
                                <div className="user-head">

                                    <CgProfile className='user-profile'  />
                                    {/* <button  className='btn' >
                                        <FaChevronRight className="user-dashboard-icon" />
                                    </button> */}
                                </div>
                                <div className="user-inner-info">
                                    <div>
                                    <BiArrowFromLeft className='dashboard-icons' />
                                    </div>
                                    <div>
                                    <BiArrowFromLeft className='dashboard-icons' />
                                    </div>
                                    <div>
                                    <BiArrowFromLeft className='dashboard-icons' />
                                    </div>
                                    <div>
                                    <BiArrowFromLeft className='dashboard-icons' />
                                    </div>
                                </div>
                            </div>}
                    </div>

                    <div className="col-md-10 user-content">
                        <div>
                            <h1 className='text-center'>Bablu Details</h1>
                        </div>
                        <div className="user-inner-content">
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="card m-4 bg-dark">
                                        <div className="card-body">
                                            <h5 className="card-title">Special title treatment</h5>
                                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                            <a href="#" className="btn btn-success">Go somewhere</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="card m-4 bg-dark">
                                        <div className="card-body">
                                            <h5 className="card-title">Special title treatment</h5>
                                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                            <a href="#" className="btn btn-primary">Go somewhere</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="card m-4 bg-dark">
                                        <div className="card-body">
                                            <h5 className="card-title">Special title treatment</h5>
                                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                            <a href="#" className="btn btn-success">Go somewhere</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="card m-4 bg-dark">
                                        <div className="card-body">
                                            <h5 className="card-title">Special title treatment</h5>
                                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                            <a href="#" className="btn btn-primary">Go somewhere</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="card m-4 bg-dark">
                                        <div className="card-body">
                                            <h5 className="card-title">Special title treatment</h5>
                                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                            <a href="#" className="btn btn-success">Go somewhere</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="card m-4 bg-dark">
                                        <div className="card-body">
                                            <h5 className="card-title">Special title treatment</h5>
                                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                            <a href="#" className="btn btn-primary">Go somewhere</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UserDashBoard
