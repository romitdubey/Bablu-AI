import { createBrowserRouter, BrowserRouter as Route, Router, RouterProvider, Routes } from 'react-router-dom'
import './App.css'
// import Header from './Components/Header/Header'
import HomePage from './Components/HomePage/HomePage'
import AppLayout from './Layout/AppLayout'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      // errorElement:<ErrorPage />,
      children:[
        {
          path: "/",
          element:<HomePage/>,
        }
      ]
    }],
    { basename: "/" } 
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
  return <RouterProvider router={router}></RouterProvider>
}

export default App
