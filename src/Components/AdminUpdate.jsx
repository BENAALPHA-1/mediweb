import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminUpdate = () => {
  const [updateType, setUpdateType] = useState("user"); // user, client, drug
  const [updateId, setUpdateId] = useState("");
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (updateId.trim()) {
      navigate(`/admin/update/${updateType}/${updateId}`);
    } else {
      alert("Please enter a valid ID.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Update Section</h2>

      <div className="flex flex-col space-y-4 bg-white p-4 rounded shadow">
        <select
          value={updateType}
          onChange={(e) => setUpdateType(e.target.value)}
          className="border rounded px-2 py-2"
        >
          <option value="user">User</option>
          <option value="client">Client</option>
          <option value="drug">Drug</option>
        </select>

        <input
          type="text"
          placeholder="Enter ID to update"
          value={updateId}
          onChange={(e) => setUpdateId(e.target.value)}
          className="border px-3 py-2 rounded"
        />

        <button
          onClick={handleRedirect}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Go to Update Form
        </button>
      </div>
    </div>
  );
};

export default AdminUpdate;
