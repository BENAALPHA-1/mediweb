import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminUserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users and clients
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/admin/users");
      setUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete user or client by ID
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/api/admin/user/${userId}`);
      setUsers(users.filter((user) => user.UserID !== userId)); // Remove deleted user from state
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users on component mount
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-table">
      <h2>Users & Clients</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.UserID}>
              <td>{user.UserName}</td>
              <td>{user.UserEmail}</td>
              <td>{user.UserPhone}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleDelete(user.UserID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserTable;
