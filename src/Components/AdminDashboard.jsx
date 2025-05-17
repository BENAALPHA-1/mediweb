import React, { useState } from "react";
import AdminUserTable from "./AdminUserTable";
import AdminDrugTable from "./AdminDrugTable";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [updateType, setUpdateType] = useState("user"); // "user", "client", or "drug"
  const [updateId, setUpdateId] = useState("");
  const navigate = useNavigate();

  const handleUpdateRedirect = () => {
    if (updateId.trim()) {
      navigate(`/admin/update/${updateType}/${updateId}`);
    } else {
      alert("Please enter a valid ID.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="dashboard-container">
        {/* Tabs */}
        <div className="tabs flex space-x-4 mb-4 items-center flex-wrap">
          <button
            className={`tab px-4 py-2 rounded ${
              activeTab === "users" ? "bg-blue-500 text-white" : "bg-white border"
            }`}
            onClick={() => setActiveTab("users")}
          >
            Users & Clients
          </button>
          <button
            className={`tab px-4 py-2 rounded ${
              activeTab === "drugs" ? "bg-blue-500 text-white" : "bg-white border"
            }`}
            onClick={() => setActiveTab("drugs")}
          >
            Drugs
          </button>

          {/* Update controls */}
          <div className="flex items-center space-x-2 bg-white p-2 rounded shadow-md border ml-auto">
            <select
              value={updateType}
              onChange={(e) => setUpdateType(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="user">User</option>
              <option value="client">Client</option>
              <option value="drug">Drug</option>
            </select>
            <input
              type="text"
              placeholder="Enter ID"
              value={updateId}
              onChange={(e) => setUpdateId(e.target.value)}
              className="border rounded px-2 py-1"
            />
            <button
              className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
              onClick={handleUpdateRedirect}
            >
              Update
            </button>
          </div>
        </div>

        {/* Tab content */}
        <div className="tab-content">
          {activeTab === "users" && <AdminUserTable />}
          {activeTab === "drugs" && <AdminDrugTable />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
