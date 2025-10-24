import React, { useEffect, useState } from 'react'
import CustomerAdd from './CustomerAdd'
import { listCustomers, deleteCustomer } from '../services/customerServices'
import Customer from './Customer'
import CustomerEdit from './CustomerEdit'
import CustomerFilter from './CustomerFilter'




const CustomerIndex = () => {
  const [addCustomerModal, setAddCustomerModal] = useState(false)
  const [editCustomerModal, setEditCustomerModal] = useState(false)
  const [customers, setCustomers] = useState([])

  //filter
  const [searchFilter, setSearchFilter] = useState("")
  //filter

  // Fetch customers (with optional filter)
  const fetchCustomers = async (signal, search = '') => {
    try {
      const data = await listCustomers(signal, { search }) // service returns res.data
      setCustomers(Array.isArray(data) ? data : data.customers || [])
    } catch (err) {
      // cancellation checks: axios v1+ with AbortController -> err.name === 'CanceledError' or err.code === 'ERR_CANCELED'
      if (err?.name === 'CanceledError' || err?.name === 'AbortError' || err?.code === 'ERR_CANCELED') {
        // request was aborted, ignore
        return
      }
      console.error('Error fetching customers:', err)
    }
  }

  //Fetch customers when component mounts or filter changes
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    fetchCustomers(signal, searchFilter)
    // cleanup: cancel request on unmount
    return () => controller.abort()
  }, [searchFilter])

  const handleDelete = async (id) => {
    try {
      // Call delete service  
      await deleteCustomer(id)
      // Refresh customer list
      fetchCustomers()
      alert("Customer deleted successfully");
    } catch (error) {
      console.error("Error deleting customer:", error);
      alert("Failed to delete customer. Please try again.");
    }
  };

  const [selectedCustomerForEdit, setSelectedCustomerForEdit] = useState(null);
  const handleEditClick = (customer) => {

    setSelectedCustomerForEdit(customer);
    setEditCustomerModal(true);
  };


  return (
    <div className="w-[100%] min-h-screen p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Customers</h1>

      <div className="w-full flex justify-between items-center mb-6">

        <div className=' w-full flex flex-col sm:flex-row '>

          <button
            className="bg-orange-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setAddCustomerModal(true)}
          > Add
          </button>


          <CustomerFilter searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
        </div>

        {/* <CustomerFilter searchFilter={searchFilter} setSearchFilter={setSearchFilter} /> */}


        <CustomerAdd addCustomerModal={addCustomerModal} setAddCustomerModal={setAddCustomerModal} fetchCustomers={fetchCustomers} />
        <CustomerEdit editCustomerModal={editCustomerModal}
          setEditCustomerModal={setEditCustomerModal} fetchCustomers={fetchCustomers}
          customer={selectedCustomerForEdit} />


      </div>


      <div className="mt-6">
        {customers.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No customers found.
          </div>
        ) : (
          <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
            {customers.map((item) => (
              <Customer
                key={item._id}
                customer={item}
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

export default CustomerIndex