import './styles/App.css'
import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import Login from './pages/Login'
import Home from './pages/Home'
import Signup from './pages/Signup';
import RouteLayout from './layout/RootLayout';
import AuthLayout from './layout/AuthLayout';
import Customer from './pages/CustomerIndex';
import RequireAuth from './routes/UserRoute';
import ErrorPage from './pages/ErrorPage';
import User from './pages/UserIndex';


const router = createBrowserRouter([
  {
    element: <RouteLayout />,
    children: [

      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
    ]
  },
  {
    element: <RequireAuth><AuthLayout /></RequireAuth>,
    // errorElement: <div>Something went wrong!</div>,
    children: [
      { path: '/customers', element: <Customer /> },
      { path: '/users', element: <User /> },
      { path: "*", element: <ErrorPage /> },
    ]
  }


])


function App() {


  return (
    <div>

      <RouterProvider router={router} />
    </div>

  )
}

export default App
