import React, { useState, useEffect } from 'react'
import { updateUser } from '../services/userServices';

const UserEdit = ({ editUserModal, setEditUserModal, fetchUser, user }) => {

    const [backendError, setBackendError] = useState("");
    const [formData, setFormData] = useState({

        name: "",
        email: "",
        phone: "",

    });

    console.log(user, 'from user edit modal');

    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors = {};

        // Name
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        // Email
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email";
        }

        // Phone number (must be 10 digits, not all 0s)
        if (!formData.phone) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Phone number must be 10 digits";
        } else if (/^0{10}$/.test(formData.phone)) {
            newErrors.phone = "Phone number cannot be all zeros";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };



    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user])

    // Handle Input Change
    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    };


    function handleClose() {
        setEditUserModal(false);
        setErrors({ name: "", contact_info: "", status: "" });

    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {

            try {
                const response = await updateUser(user._id, formData)
                alert("User updated successfuly ");
                handleClose();
                fetchUser()
            } catch (error) {
                console.error("Error adding user:", error.response?.data?.error);
                const backendMessage = error.response?.data?.type === 'duplicate_field' && error.response?.data?.message
                setBackendError(backendMessage);
                // alert("Failed to update user. Please try again.");
            } finally {
                // setLoading(false);
            }
        }

    }




    return (
        <div>

            <div className={`h-screen w-full md:w-1/2 bg-white fixed top-0 right-0 z-50 transform transition-transform duration-500 
                    ${editUserModal ? "translate-x-0" : "translate-x-full"}  `}>


                {/* dialog close button  */}
                <button onClick={handleClose} className='bg-white/20 backdrop-blur-md hover:bg-white/50 transition px-2 py-2 rounded-md fixed top-0 left-0' >
                    {/* <LuX size={20} className="text-slate-800" /> */}
                    close
                </button>
                {/* dialog close button  */}

                {/* status */}
                <div className='w-[100%] h-[100%] flex justify-center'>
                    <form action="" className='w-[80%] p-2 flex flex-col items-start gap-4 mt-10' onSubmit={handleSubmit}>
                        <h1 className="text-2xl font-bold text-center mb-6">Edit User</h1>


                         {/* Backend error display */}
                        {backendError && (
                            <p className="text-red-600 text-sm mb-2">{backendError}</p>
                        )}


                        {/* Name, Email, Phone fields */}
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
                                    name="email"
                                    className='rounded-lg p-3 border-2'
                                    placeholder='Email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.email && <p className='text-red-600 text-sm'>{errors.email}</p>}
                            </div>



                            {/* status */}
                            <div className='flex flex-col'>
                                <label>Phone <span className='text-red-500'>*</span></label>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Enter 10-digit phone number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className='rounded-lg p-3 border-2'
                                    required
                                />
                                {errors.phone && <p className='text-red-600 text-sm'>{errors.phone}</p>}
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

export default UserEdit