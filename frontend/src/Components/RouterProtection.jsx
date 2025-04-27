import React, { use, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const RouterProtection = (props) => {
    const { Component } = props;
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const Navigate = useNavigate();
    useEffect(() => {
        let userUid = (localStorage.getItem("uId"));
        // console.log(userUid)
        
        if (userUid == null) {
            Navigate("/login")
        } else {
            console.log("User is logged in", userUid)
        }
        
    }, [])
    return (
        <div>
            <Component />
        </div>
    )
}

export default RouterProtection
