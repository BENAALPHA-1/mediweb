import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


const AdminUpdateForm = () => {
  const { type, id } = useParams(); 
  const [formData, setFormData] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const baseURL = "https://benedictproject.pythonanywhere.com/api/admin";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/${type}/${id}`);
        setFormData(response.data);
        setMessage("");
        setError("");
      } catch (err) {
        console.error("Fetch error:", err);
        setMessage("");
        setError("Failed to fetch data. Please check the ID and try again.");
        setFormData(null);
      }
    };

    fetchData();
  }, [type, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await axios.put(`${baseURL}/${type}/${id}`, formData);
      setMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully.`);
    } catch (err) {
      console.error("Update error:", err);
      setError("Failed to update data. Please try again.");
    }
  };

  if (!formData)
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="update-container">
      <h2 className="update-title">
        Update {type.charAt(0).toUpperCase() + type.slice(1)}
      </h2>

      {message && <div className="message-success">{message}</div>}
      {error && <div className="message-error">{error}</div>}

      <form onSubmit={handleUpdate} className="update-form">
        {Object.entries(formData).map(([key, value]) =>
          key !== "id" ? (
            <div key={key} className="form-group">
              <label htmlFor={key} className="update-label">
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </label>
              <input
                id={key}
                name={key}
                type="text"
                value={value || ""}
                onChange={handleChange}
                className="update-input"
                required
              />
            </div>
          ) : null
        )}

        <button type="submit" className="update-button">
          Update
        </button>
      </form>
    </div>
  );
};

export default AdminUpdateForm;
