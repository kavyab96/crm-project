import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthNavbar from '../components/AuthNavbar' // optional different navbar

    
const AuthLayout = () => {
  return (
    <div className="min-h-screen">
      <AuthNavbar />
      <main className=""><Outlet/></main>
    </div>
  )
}
export default AuthLayout