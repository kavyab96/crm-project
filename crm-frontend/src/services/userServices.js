
import axiosInstance from "../axios/axiosInstance"
export const listUsers = async (signal,params={}) => {
   const res = await axiosInstance.get('/user/',{signal,params})
   return res.data
}

export const addUser = async (customerData) => {
   const res = await axiosInstance.post('/user/addCustomer', customerData)
   return res.data
}

export const deleteUser = async (id) => {
  const res = await axiosInstance.delete(`/user/deleteUser/${id}`)
  return res.data
}

export const updateUser = async(id,data)=>{
    const res =await axiosInstance.patch(`/user/updateUser/${id}`,data)
}

export const getDashboardData = async (signal) => {
   const res = await axiosInstance.get('/user/getDashboardData',{signal})
   return res.data
}

//logout user
export const logoutUser = async () => {
   const res = await axiosInstance.post('/user/logout')
   return res.data
}