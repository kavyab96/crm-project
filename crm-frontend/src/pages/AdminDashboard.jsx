import React, { useEffect } from 'react'
import { getDashboardData } from '../services/userServices'

const AdminDashboard = () => {
  // Dummy data (replace later with real backend data)
  const [data, setData] = React.useState(
    {
      totalUsers: 0,
      adminCount: 0,
      userCount: 0,
      totalCustomers: 0,
      activeCustomers: 0,
      inactiveCustomers: 0,
    }
  );
  const totalUsers = 42
  const adminCount = 5
  const userCount = 37

  const activeCustomers = 18
  const inactiveCustomers = 7


  const getData = async (signal) => {
    try {
      const data = await getDashboardData(signal)
      setData(Array.isArray(data) ? data : data.data || [])
    } catch (err) {
      // cancellation checks: axios v1+ with AbortController -> err.name === 'CanceledError' or err.code === 'ERR_CANCELED'
      if (err?.name === 'CanceledError' || err?.name === 'AbortError' || err?.code === 'ERR_CANCELED') {
        // request was aborted, ignore
        return
      }
      console.error('Error fetching customers:', err)
    }
  }
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    getData(signal)
    // cleanup: cancel request on unmount
    return () => controller.abort()
  }, [])

console.log(
  data,'hyugeyfuguyee'
);


  return (
    <div className="w-[100%] p-8 min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white transition-all">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Admin Dashboard</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Welcome, Admin! Manage users, customers, and system settings here.
      </p>

      {/* Cards Section */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* 🧑‍💼 Users Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-shadow">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">Users</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Total number of users in the system</p>
          </div>

          <div className="flex flex-col gap-2 mt-auto">
            <p className="text-lg font-medium">
              <span className="text-gray-500 dark:text-gray-400">Total:</span>{' '}
              <span className="font-bold text-blue-600 dark:text-blue-400">{data.totalUsers}</span>
            </p>
            <div className="flex justify-between mt-2">
              <p className="text-sm text-gray-600 dark:text-gray-300">Admins:</p>
              <p className="font-semibold text-green-600 dark:text-green-400">{data.adminCount}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-300">Users:</p>
              <p className="font-semibold text-purple-600 dark:text-purple-400">{data.userCount}</p>
            </div>
          </div>
        </div>

        {/* 👥 Customers Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-shadow">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">Customers</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Status of registered customers</p>
          </div>

          <div className="flex flex-col gap-2 mt-auto">

             <p className="text-lg font-medium">
              <span className="text-gray-500 dark:text-gray-400">Total:</span>{' '}
              <span className="font-bold text-blue-600 dark:text-blue-400">{data.totalCustomers}</span>
            </p>

            <div className="flex justify-between mt-2">
              <p className="text-sm text-gray-600 dark:text-gray-300">Active:</p>
              <p className="font-semibold text-green-600 dark:text-green-400">{data.activeCustomers}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-300">Inactive:</p>
              <p className="font-semibold text-red-600 dark:text-red-400">{data.inactiveCustomers}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
