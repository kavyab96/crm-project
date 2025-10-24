import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function AuthNavbar() {
  const navigate = useNavigate()

  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user') || 'null') } catch { return null }
  })
  useEffect(() => {
    const onStorage = () => {
      try { setUser(JSON.parse(localStorage.getItem('user') || 'null')) } catch { setUser(null) }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const handleLogout = () => {
    // clear local client auth (adjust if you use cookies/tokens)
    localStorage.removeItem('user')
    // navigate to public home (or login) after logout
    navigate('/')
    // optional: force full reload to clear state/UI
    window.location.reload()
  }

  return (
    <header className="w-full h-[12vh] text-black flex justify-center items-center shadow-md dark:bg-gray-900 dark:text-white">
      <nav className="w-full h-full flex items-center justify-between py-6 px-8">
        <div className='w-full flex items-center gap-4'>

          <NavLink to="/customers" className="font-semibold">CRM Project</NavLink>
          <div>
            <p className="text-sm text-gray-300">
              {user?.name ? `Hello, ${user.name}` : 'Not signed in'}
            </p>
          </div>
        </div>

        <ul className="flex gap-4 items-center">
          <li>
            <NavLink
              to="/customers"
              className={({ isActive }) =>
                isActive
                  ? 'text-slate-200 font-semibold border-b-2 border-red-300 pb-1'
                  : 'hover:text-red-400'
              }
            >
              Customers
            </NavLink>
          </li>

          <li>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700 font-medium px-3 py-1 rounded"
              aria-label="Logout"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}