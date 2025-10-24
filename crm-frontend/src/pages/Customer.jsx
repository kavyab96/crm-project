import React from "react";

const Customer = ({ customer,handleDelete,handleEditClick }) => {
  

  return (
    <div className="w-full ">
        <div
          key={customer._id || i}
          className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition duration-300"
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-gray-800">{customer.name}</h2>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Email:</span> {customer.contact_info || "—"}
            </p>
            

            {/* Optional: status or type */}
            {customer.status !== undefined && (
              <span
                className={`inline-block w-fit px-3 py-1 mt-2 text-xs font-semibold rounded-full ${
                  customer.status === true
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {customer.status===true ? "Active" : "Inactive"}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-4">
            {/* <button
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              onClick={() => alert(`Viewing ${customer.name}`)}
            >
              View
            </button> */}

             <button
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              onClick={()=>handleEditClick(customer)}
            >
              Edit
            </button>

            <button
              className="text-red-600 hover:text-red-800 text-sm font-medium"
              onClick={() => handleDelete(customer._id)}
            >
              Delete
            </button>
          </div>
        </div>
    </div>
  );
};

export default Customer;
