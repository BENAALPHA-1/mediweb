import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AdminUpdate = () => {
  const [userData, setUserData] = useState(null);
  const [drugData, setDrugData] = useState(null);
  const [isUserUpdate, setIsUserUpdate] = useState(true); // Toggle between user and drug update
  const { id } = useParams(); // Get ID from URL

  // Fetch data when ID or type of update changes
  useEffect(() => {
    const fetchData = async () => {
      if (isUserUpdate) {
        try {
          const response = await axios.get(`https://benedictproject.pythonanywhere.com/api/admin/user/${id}`);
          setUserData(response.data);
        } catch (err) {
          console.error("Error fetching user data", err);
        }
      } else {
        try {
          const response = await axios.get(`https://benedictproject.pythonanywhere.com/api/admin/drug/${id}`);
          setDrugData(response.data);
        } catch (err) {
          console.error("Error fetching drug data", err);
        }
      }
    };

    fetchData();
  }, [id, isUserUpdate]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (isUserUpdate) {
      try {
        await axios.put(`https://benedictproject.pythonanywhere.com/api/admin/user/${id}`, userData);
        alert("User updated successfully.");
      } catch (err) {
        console.error("Error updating user", err);
      }
    } else {
      try {
        await axios.put(`https://benedictproject.pythonanywhere.com/api/admin/drug/${id}`, drugData);
        alert("Drug updated successfully.");
      } catch (err) {
        console.error("Error updating drug", err);
      }
    }
  };

  return (
    <div className="update-container">
      <h2>Update {isUserUpdate ? "User" : "Drug"}</h2>
      <form onSubmit={handleUpdate}>
        {isUserUpdate ? (
          <>
            <label>Name:</label>
            <input
              type="text"
              value={userData?.name || ""}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            />
            {/* Add other user fields as needed */}
          </>
        ) : (
          <>
            <label>Drug Name:</label>
            <input
              type="text"
              value={drugData?.name || ""}
              onChange={(e) => setDrugData({ ...drugData, name: e.target.value })}
            />
            {/* Add other drug fields as needed */}
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
