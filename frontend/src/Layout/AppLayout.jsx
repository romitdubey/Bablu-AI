import React from 'react'
import Header from '../Components/Header/Header'
import HomePage from '../Components/HomePage/HomePage'
// import SignupForm from '../Components/Login-SignUp page/SignupForm'
import UserDashBoard from '../Components/User-DashBoard-Page/UserDashBoard'
import Interview_Home_Page from "../Components/Interview page/Interview-Home-Page"
const AppLayout = () => {

  return (
   <>
   <Header/>
   {/* <SignupForm/> */}
   <HomePage/>
   <Interview_Home_Page />
   <UserDashBoard/>
   </>
  )
}

export default AppLayout
