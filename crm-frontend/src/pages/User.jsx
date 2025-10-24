import React from "react";

const User = ({ user, handleDelete, handleEditClick }) => {


  return (
    <div className="w-full ">
      <div
        key={user._id || i}
        className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition duration-300"
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Email:</span> {user.email || "—"}
          </p>

          <p className="text-sm text-gray-600">
            <span className="font-medium">Role:</span> {user.role || "—"}
          </p>

          <p className="text-sm text-gray-600">
            <span className="font-medium">Phone:</span> {user.phone || "—"}
          </p>

        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-4">
          {/* <button
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              onClick={() => alert(`Viewing ${user.name}`)}
            >
              View
            </button> */}


          <button
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            onClick={() => handleEditClick(user)}
          >
            Edit
          </button>

          <button
            className="text-red-600 hover:text-red-800 text-sm font-medium"
            onClick={() => handleDelete(user._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
