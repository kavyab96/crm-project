import React, { useEffect, useState } from 'react'
// import UserAdd from './UserAdd'
import { listUsers, deleteUser } from '../services/UserServices'
import User from './User'
import UserEdit from './UserEdit'
import UserFilter from './UserFilter'




const UserIndex = () => {
  const [addUserModal, setAddUserModal] = useState(false)
  const [editUserModal, setEditUserModal] = useState(false)
  const [users, setUsers] = useState([])

  //filter
  const [searchFilter, setSearchFilter] = useState("")
  //filter

  // Fetch users (with optional filter)
  const fetchUser = async (signal, search = '') => {
    try {
      const data = await listUsers(signal, { search }) // service returns res.data
      setUsers(Array.isArray(data) ? data : data.users || [])
    } catch (err) {
      // cancellation checks: axios v1+ with AbortController -> err.name === 'CanceledError' or err.code === 'ERR_CANCELED'
      if (err?.name === 'CanceledError' || err?.name === 'AbortError' || err?.code === 'ERR_CANCELED') {
        // request was aborted, ignore
        return
      }
      console.error('Error fetching users:', err)
    }
  }

  //Fetch users when component mounts or filter changes
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    fetchUser(signal, searchFilter)
    // cleanup: cancel request on unmount
    return () => controller.abort()
  }, [searchFilter])

  const handleDelete = async (id) => {
    try {
      // Call delete service  
      await deleteUser(id)
      // Refresh user list
      fetchUser()
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);
  const handleEditClick = (user) => {

    setSelectedUserForEdit(user);
    setEditUserModal(true);
  };


  return (
    <div className="w-[100%] min-h-screen p-6">
      <h1 className="text-2xl font-bold text-center mb-6">User</h1>

      <div className="w-full flex justify-between items-center mb-6">

        <div className=' w-full flex flex-col sm:flex-row '>
          {/* 
          <button
            className="bg-orange-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setAddUserModal(true)}
          > Add
          </button> */}


          <UserFilter searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
        </div>



        {/* <UserAdd addUserModal={addUserModal} setAddUserModal={setAddUserModal} fetchUser={fetchUser} /> */}
        <UserEdit editUserModal={editUserModal}
          setEditUserModal={setEditUserModal} fetchUser={fetchUser}
          user={selectedUserForEdit} />


      </div>


      <div className="mt-6">
        {users.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No users found.
          </div>
        ) : (
          <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
            {users.map((item) => (
              <User
                key={item._id}
                user={item}
                handleDelete={handleDelete}
                handleEditClick={handleEditClick}
              />
            ))}
          </div>
        )}
      </div>


    </div>
  )
}

export default UserIndex