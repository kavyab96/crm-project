import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <header className='w-[100%] h-[12vh] text-black flex justify-center items-center shadow-md dark:bg-gray-900  dark:text-white'>
        <nav className='w-[100%] h-[100%] flex items-center justify-between py-6 px-8 ' >
          <NavLink to="/" className="">CRM Project</NavLink>
          <ul className='flex gap-3 justify-items-end'>

            <li>

              <NavLink title="Home" to="/"
                className={
                  ({ isActive }) => isActive
                    ? "text-salte-800 font-semibold border-b-2 border-red-300 pb-1"
                    : "hover:text-red-400"
                }>
                <span className="inline-block">
                  Home
                </span>
              </NavLink>
            </li>


            <li>

              <NavLink title="Home" to="/login"
                className={
                  ({ isActive }) => isActive
                    ? "text-salte-800 font-semibold border-b-2 border-red-300 pb-1"
                    : "hover:text-red-400"
                }>
                <span className="inline-block">
                  Login
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink title="Sign Up" to="/signup"
                className={
                  ({ isActive }) => isActive
                    ? "text-salte-800 font-semibold border-b-2 border-red-300 pb-1"
                    : "hover:text-red-400"
                }>
                <span className="inline-block">
                  Sign Up
                </span>
              </NavLink>
            </li>




          </ul>

        </nav>
      </header>
    </>
  )
}

export default Navbar