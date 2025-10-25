import React, { useState ,useEffect} from 'react'
import { updateCustomer } from '../services/customerServices';
import { X } from 'lucide-react'
import { toast } from 'react-toastify';

const CustomerEdit = ({ editCustomerModal, setEditCustomerModal,fetchCustomers,customer }) => {

    // const [loading,setLoading]=useState(false)
    const [formData, setFormData] = useState({
        name: "",
        contact_info: "",
        status: "",
    });

    console.log(customer,'from edit modal');
    
    const [errors, setErrors] = useState({});

     useEffect(() => {
        if (customer) {
            setFormData(customer);
        }
    }, [customer])

    // Handle Input Change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  };


    function handleClose() {
        setEditCustomerModal(false);
        setErrors({ name: "", contact_info: "", status: "" });

    }

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await updateCustomer(customer._id,formData)
            toast.success("Customer updated successfuly ");
            handleClose();
            fetchCustomers()
        } catch (error) {
            console.error("Error adding customer:", error.response?.data?.error);
            toast.error("Failed to add customer. Please try again."); 
        } finally{
            // setLoading(false);
        }

    }




    return (
        <div>

            <div className={`h-screen w-full md:w-1/2 bg-white fixed top-0 right-0 z-50 transform transition-transform duration-500 
                    ${editCustomerModal ? "translate-x-0" : "translate-x-full"}  `}>


                {/* dialog close button  */}
                <button onClick={handleClose} className='bg-white/20 backdrop-blur-md hover:bg-white/50 transition px-2 py-2 rounded-md fixed top-0 left-0' >
                                       <X size={22} className="dark:text-gray-700 dark:text-gray-200" />

                     </button>
                {/* dialog close button  */}

                {/* status */}
                <div className='w-[100%] h-[100%] flex justify-center'>
                    <form action="" className='w-[80%] p-2 flex flex-col items-start gap-4 mt-10' onSubmit={handleSubmit}>
                        <h1 className="text-2xl font-bold text-center mb-6">Add Customer</h1>


                        <div className='w-[100%] grid grid-cols-2 gap-2'>
                            {/* Name */}
                            <div className='flex flex-col'>
                                <label>Name <span className='text-red-500'>*</span></label>
                                <input 
                                type="text" 
                                name="name" 
                                className='rounded-lg p-3 border-2'
                                value={formData.name} 
                                onChange={handleChange} 
                                required
                                />
                                {errors.name && <p className='text-red-600 text-sm'>{errors.name}</p>}
                            </div>

                            {/* contact_info */}

                             <div className='flex flex-col'>
                                <label>Email <span className='text-red-500'>*</span></label>
                                <input 
                                type="email" 
                                name="contact_info" 
                                className='rounded-lg p-3 border-2'
                                placeholder='Email'
                                value={formData.contact_info} 
                                onChange={handleChange} 
                                required
                                />
                                {errors.name && <p className='text-red-600 text-sm'>{errors.name}</p>}
                            </div>
                            


                            {/* status */}
                            <div className='flex flex-col'>
                                <label>Type <span className='text-red-500'>*</span></label>
                                <select name="status" 
                                className='rounded-lg p-3 border-2' 
                                value={formData.status} 
                                required
                                onChange={handleChange}
                                >
                                    <option value="" disabled>Select Status</option>
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                                {errors.type && <p className='text-red-600 text-sm'>{errors.type}</p>}
                            </div>



                        </div>

                        <div className='w-[100%] grid grid-cols-2 justify-items-center mt-5 '>
                            <button type="button"
                             onClick={handleClose}
                               className='w-[75%] p-[5px] py-2 border-[1px] shadow-md rounded-lg text-white font-bold text-[1.2rem] bg-red-400 hover:bg-red-600 hover:text-white'>Cancel</button>
                            <button type="submit" className='w-[75%] p-[5px] py-2 border-[1px] shadow-md rounded-lg text-white font-bold text-[1.2rem] bg-green-500 hover:bg-green-700 hover:text-white'>Update</button>
                        </div>


                    </form>
                </div>




            </div>


        </div>
    )
}

export default CustomerEdit