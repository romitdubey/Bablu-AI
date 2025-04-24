import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const RouterProtection = (props) => {
    const { Component } = props;
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const Navigate = useNavigate();
    useEffect(() => {
        let x = JSON.parse(localStorage.getItem("UserCred"));
        
        if (x == null) {
            Navigate("/login")
        } else {
            console.log("User is logged in", x.user.uid)
        }
        
    }, [])
    return (
        <div>
            <Component />
        </div>
    )
}

export default RouterProtection
