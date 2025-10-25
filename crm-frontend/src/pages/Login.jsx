import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from "react-toastify";

const Login = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const validate = () => {
    let newErrors = {};

    // email
    if (!formData.email.trim()) {
      newErrors.name = "Email is required";
    }

    // pswd
    if (!formData.password.trim()) {
      newErrors.name = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  // Handle Input Change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (validate()) {

      try {
        const response = await axios.post('http://localhost:3000/api/user/login', formData, {
          withCredentials: true
        })
        toast.success("login successful ");
        setErrors({});
        localStorage.setItem('user', JSON.stringify(response.data))

        if(response.data.role === 'admin'){
          navigate('/admin-dashboard')
        }else{
        navigate('/customers')
        }

      } catch (error) {
        const backendError =
          error.response?.data?.error ||// your middleware's "error" key
          error.response?.data?.message || // general controller errors
          "Signup failed. Please try again.";

        // Display backend error in UI
        setErrors({ general: backendError });

      } finally {
        setLoading(false)
        setFormData({ email: "", password: "" });
      }
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Login to Your Account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              onChange={handleChange}
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              onChange={handleChange}
            />
          </div>


          {/*  Show backend (general) error */}
          {errors.general && (
            <p className="text-red-500 text-center text-sm mt-2">
              {errors.general}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            ) : (
              "Sign Up"
            )}

          </button>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
