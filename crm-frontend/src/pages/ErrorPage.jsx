import React from 'react'

const ErrorPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center justify-center relative p-6rounded-xl ">
        
        {/* Image */}
        <img
          src={`${import.meta.env.BASE_URL}images/no-data.jpg`}
          alt="page not found"
          className="w-48 h-48 rounded-full shadow-md mb-6 object-cover"
        />

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong!!</h2>
        <p className="text-gray-500 text-center mb-4">
          The page you are looking for might be missing or an error occurred.
        </p>

        {/* Optional button */}
        {/* <button
          onClick={handleBack}
          className="px-6 py-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 transition duration-300"
        >
          Go Back
        </button> */}
        
      </div>
    </div>
  )
}

export default ErrorPage
