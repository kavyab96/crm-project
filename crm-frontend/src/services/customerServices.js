
import axiosInstance from "../axios/axiosInstance"
export const listCustomers = async (signal,params={}) => {
   const res = await axiosInstance.get('/customers/',{signal,params})
   return res.data
}

export const addCustomer = async (customerData) => {
   const res = await axiosInstance.post('/customers/addCustomer', customerData)
   return res.data
}

export const deleteCustomer = async (id) => {
  const res = await axiosInstance.delete(`/customers/delCustomer/${id}`)
  return res.data
}

export const updateCustomer = async(id,data)=>{
    const res =await axiosInstance.patch(`/customers/updateCustomers/${id}`,data)
}