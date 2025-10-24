import React from "react";

const CustomerFilter = ({ searchFilter, setSearchFilter }) => {
     
  return (
    <div className="w-full sm:ml-4 ">
      <input
        type="text"
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
        placeholder="Search customers by name or email"
        className="w-[300px] sm:w-[400px] border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
    </div>
  );
};

export default CustomerFilter;
