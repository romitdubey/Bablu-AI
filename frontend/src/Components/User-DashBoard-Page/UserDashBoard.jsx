import React, { use, useState } from 'react'
import { FaChevronLeft } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BiArrowFromLeft } from "react-icons/bi";
import { storage, auth } from "../../firebase"
import { uploadBytes, ref } from "firebase/storage";
import { useNavigate } from 'react-router-dom';

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
    }

    const [resumeFile, setResumeFile] = useState(null);
    const [jd, setJd] = useState("");

    async function startUpload() {
        if (jd == "") {
            alert("Please enter a job description.");
            return;
        }
        if (resumeFile == null) {
            alert("Please select a file to upload.");
            return;
        }
        if (resumeFile.size > 10485760) {
            alert("File size exceeds 10MB. Please upload a smaller file.");
            return;
        }
        if (resumeFile.type !== "application/pdf") {
            alert("Please upload a PDF file.");
            return;
        }        

        try {
            const resumeRef = ref(storage, 'resumes/userId');
            const snapshot = await uploadBytes(resumeRef, resumeFile)
            console.log("Success!")
            console.log(snapshot);

            fetch("http://127.0.0.1:5000/startInterview", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    resumeId: "userId",
                    jobDesc: jd,
                    userDetails: localStorage.getItem("UserCred")
                }),
            })

            Navigate("/interview");
        }
        catch (err) {
            console.log("Oops, some error occured.");
            console.error(err);
            alert("Upload Failed! Please try again.");
        }
    }

    async function logout() {
        try {
            await auth.signOut();
            console.log("Logged out successfully")

            navigate("/");
        }
        catch (err) {
            console.log(err);
        }
    }
    const  userLogout = () => {
        // localStorage.removeItem("userData");
        Navigate("/login");
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
                                    <button className='btn btn-danger'>Logout</button>
                                </div>
                            </div>
                            : <div onClick={dashBoardSlider}>
                                <div className="user-head">

                                    <CgProfile className='user-profile' />
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

                        <h1 className='text-center'>Upload Resume & Description</h1>
                        <div className="upload-container">

                            <div className='resume-upload'>


                                <label htmlFor="resume" className='also-resume-label'>

                                    <div className="resume-header">

                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">
                                            <path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg> <p>Browse File to upload!</p>
                                    </div>
                                </label>
                                <label htmlFor="resume" className="footer">
                                    <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M15.331 6H8.5v20h15V14.154h-8.169z"></path><path d="M18.153 6h-.009v5.342H23.5v-.002z"></path></g></svg>

                                    <p>{resumeFile == null ? "No File Selected" : resumeFile.name}</p>

                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z" stroke="#000000" strokeWidth="2"></path> <path d="M19.5 5H4.5" stroke="#000000" strokeWidth="2" strokeLinecap="round"></path> <path d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z" stroke="#000000" strokeWidth="2"></path> </g></svg>
                                </label>
                                <input id="resume" name="resume" type="file" hidden onChange={(e) => {
                                    setResumeFile(e.target.files[0]);
                                }} />
                            </div>
                            <div className='jd-card'>
                                <label htmlFor="jd" className="jd-label">Job Description</label>

                                <textarea className='jd-desc' id="jd" name="jd" rows="4" cols="30" value={jd} placeholder='Enter Job Description' onChange={(e) => { setJd(e.target.value) }}>
                                </textarea>
                            </div>
                        </div>
                        <button className="cool-btn upload-btn" onClick={startUpload}>Upload</button>

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
