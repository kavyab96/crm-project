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
import ErrorPage from './pages/ErrorPage';
import User from './pages/UserIndex';
import AdminDashboard from './pages/AdminDashboard';


import AdminRoute from './routes/AdminRoute';
import UserRoute from './routes/UserRoute';


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
    element: <UserRoute><AuthLayout /></UserRoute>,
    // errorElement: <div>Something went wrong!</div>,
    children: [
      { path: '/customers', element: <Customer /> },
      { path: '/users', element: <User /> },
      { path: '/admin-dashboard', element:<AdminRoute> <AdminDashboard/> </AdminRoute> },
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
