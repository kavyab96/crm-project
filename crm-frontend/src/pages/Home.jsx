import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 text-center px-4">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
        Welcome to <span className="text-blue-600">CRM Portal</span>
      </h1>
      <p className="text-gray-600 dark:text-gray-300 max-w-md mb-6">
        Manage your clients, projects, and tasks efficiently — all in one place.
      </p>

      <div className="flex gap-4">
        <a
          href="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition"
        >
          Login
        </a>
        <a
          href="/signup"
          className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium py-2 px-6 rounded-full transition"
        >
          Sign Up
        </a>
      </div>
    </div>
  );
};

export default Home;
