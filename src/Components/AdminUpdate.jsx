import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // To handle dynamic URL params

const AdminUpdate = () => {
  const [userData, setUserData] = useState(null);
  const [drugData, setDrugData] = useState(null);
  const [isUserUpdate, setIsUserUpdate] = useState(true); // Flag to toggle between User and Drug updates
  const { id } = useParams(); // Get the ID from URL params

  // Fetch user or drug data based on ID
  const fetchData = async () => {
    if (isUserUpdate) {
      try {
        const response = await axios.get(`/api/admin/user/${id}`);
        setUserData(response.data);
      } catch (err) {
        console.error("Error fetching user data", err);
      }
    } else {
      try {
        const response = await axios.get(`/api/admin/drug/${id}`);
        setDrugData(response.data);
      } catch (err) {
        console.error("Error fetching drug data", err);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, isUserUpdate]);

  const handleUpdate = async () => {
    // Implement the update logic here for either user or drug
    if (isUserUpdate) {
      // Make PUT request to update user
      try {
        await axios.put(`/api/admin/user/${id}`, userData);
      } catch (err) {
        console.error("Error updating user", err);
      }
    } else {
      // Make PUT request to update drug
      try {
        await axios.put(`/api/admin/drug/${id}`, drugData);
      } catch (err) {
        console.error("Error updating drug", err);
      }
    }
  };

  return (
    <div className="update-container">
      <h2>Update {isUserUpdate ? "User" : "Drug"}</h2>
      {/* Render form based on user or drug update */}
      <form onSubmit={handleUpdate}>
        {isUserUpdate ? (
          <>
            <label>Name:</label>
            <input
              type="text"
              value={userData?.name || ""}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            />
            {/* Other fields for updating user */}
          </>
        ) : (
          <>
            <label>Drug Name:</label>
            <input
              type="text"
              value={drugData?.name || ""}
              onChange={(e) => setDrugData({ ...drugData, name: e.target.value })}
            />
            {/* Other fields for updating drug */}
          </>
        )}
        <button type="submit">Update</button>
      </form>
      <button onClick={() => setIsUserUpdate(!isUserUpdate)}>
        Toggle to {isUserUpdate ? "Drug" : "User"} Update
      </button>
    </div>
  );
};

export default AdminUpdate;
