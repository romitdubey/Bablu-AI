import { createBrowserRouter, BrowserRouter as Route, Router, RouterProvider, Routes } from 'react-router-dom'
import './App.css'
// import Header from './Components/Header/Header'
import HomePage from './Components/HomePage/HomePage'
import AppLayout from './Layout/AppLayout'
import LoginForm from './Components/LoginSignup/LoginForm'
import SignupForm from './Components/LoginSignup/SignupForm'
import UserDashBoard from './Components/User-DashBoard-Page/UserDashBoard'

const router = createBrowserRouter([
  {
      path: "/",
      element: <AppLayout />,
      // errorElement:<ErrorPage />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/login", element: <LoginForm /> },
        { path: "/signup", element: <SignupForm /> },
        { path: "/dashboard", element: <UserDashBoard /> }
      ]
    }]
  )
  // return (
    //   <>
  //   <Router>
  //     <Header/>
  //     <Routes>
  //       <Route path="/" element={<HomePage/>} ></Route>
  //     </Routes>
  //   </Router>
  //   </>
  // )
  function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
