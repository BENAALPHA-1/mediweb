import React, { useState } from "react";
import AdminUserTable from "./AdminUserTable";
import AdminDrugTable from "./AdminDrugTable";
import AdminNavbar from "./AdminNavbar";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <AdminNavbar /> */}
      <div className="dashboard-container p-4">
        {/* Tabs */}
        <div className="tabs flex space-x-4 mb-4">
          <button
            className={`tab px-4 py-2 rounded ${activeTab === "users"}`}
            onClick={() => setActiveTab("users")}
          >
            Users & Clients
          </button>
          <button
            className={`tab px-4 py-2 rounded ${activeTab === "drugs" }`}
            onClick={() => setActiveTab("drugs")}
          >
            Drugs
          </button>
          <Link to="/admin/update/1" className="tab px-4 py-2 bg-yellow-400 rounded text-success">
            Update
          </Link>
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
