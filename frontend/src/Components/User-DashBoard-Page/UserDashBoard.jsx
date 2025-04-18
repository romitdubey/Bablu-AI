import React, { use, useState } from 'react'
import { FaChevronLeft } from "react-icons/fa";

import './UserDashBoard.css'

const UserDashBoard = () => {
    const [userNavWidth, setUserNavWidth] = useState(true);
    const leftAero = () => {
        setUserNavWidth(false);
        console.log(userNavWidth)
    }
    return (
        <section className="user-dashbord">
            <div className='m-4'>
                <div className="row">
                    <div className="col-md-2 user-info">
                        <div className="user-head">
                            <h2>Bablu</h2>
                            <button onClick={leftAero} className='btn' >
                                <FaChevronLeft className="user-dashboard-icon" />
                            </button>
                        </div>
                        <div className="user-inner-info">
                            <h6>demo1</h6>
                            <h6>demo2</h6>
                            <h6>demo3</h6>
                            <h6>demo4</h6>
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div>
                            <h1 className='text-center'>Bablu Details</h1>
                        </div>
                        <div className="user-inner-content">
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="card m-4 bg-dark">
                                        <div class="card-body">
                                            <h5 class="card-title">Special title treatment</h5>
                                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                            <a href="#" class="btn btn-success">Go somewhere</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="card m-4 bg-dark">
                                        <div class="card-body">
                                            <h5 class="card-title">Special title treatment</h5>
                                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                            <a href="#" class="btn btn-primary">Go somewhere</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="card m-4 bg-dark">
                                        <div class="card-body">
                                            <h5 class="card-title">Special title treatment</h5>
                                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                            <a href="#" class="btn btn-success">Go somewhere</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="card m-4 bg-dark">
                                        <div class="card-body">
                                            <h5 class="card-title">Special title treatment</h5>
                                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                            <a href="#" class="btn btn-primary">Go somewhere</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="card m-4 bg-dark">
                                        <div class="card-body">
                                            <h5 class="card-title">Special title treatment</h5>
                                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                            <a href="#" class="btn btn-success">Go somewhere</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="card m-4 bg-dark">
                                        <div class="card-body">
                                            <h5 class="card-title">Special title treatment</h5>
                                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                            <a href="#" class="btn btn-primary">Go somewhere</a>
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
