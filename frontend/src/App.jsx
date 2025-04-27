import { createBrowserRouter, BrowserRouter as Route, Router, RouterProvider, Routes } from 'react-router-dom'
import './App.css'
// import Header from './Components/Header/Header'
import HomePage from './Components/HomePage/HomePage'
import AppLayout from './Layout/AppLayout'
import LoginForm from './Components/LoginSignup/LoginForm'
import SignupForm from './Components/LoginSignup/SignupForm'
import UserDashBoard from './Components/User-DashBoard-Page/UserDashBoard'
import InterviewHomePage from './Components/Interview page/Interview-Home-Page'
import TextToSpeech from './Components/Text-Speech/TextToSpeech'
import RouterProtection from './Components/RouterProtection'
import Dictaphone from './Components/Text-Speech/Dictaphone'


const router = createBrowserRouter([
  {
      path: "/",
      element: <AppLayout />,
      // errorElement:<ErrorPage />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/login", element: <LoginForm /> },
        { path: "/signup", element: <SignupForm /> },
        { path: "/dashboard", element: <RouterProtection Component={UserDashBoard} /> },
        { path: "/interview", element: <RouterProtection Component={InterviewHomePage}/>},
        // { path: "/speech", element: <TextToSpeech /> },
        { path: "/text", element: <Dictaphone /> }
      ]
    }]
  )
  function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
