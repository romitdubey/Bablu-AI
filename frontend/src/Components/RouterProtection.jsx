import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const RouterProtection = (props) => {
    const { Component } = props;
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const Navigate = useNavigate();
    useEffect(() => {
        let userUid = JSON.parse(localStorage.getItem("uId"));
        
        if (userUid == null) {
            Navigate("/login")
        } else {
            console.log("User is logged in", userUid.user.uid)
        }
        
    }, [])
    return (
        <div>
            <Component />
        </div>
    )
}

export default RouterProtection
