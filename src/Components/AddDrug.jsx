import React, { useState } from "react";
import axios from "axios";

const AddDrug = () => {
  const [formData, setFormData] = useState({
    DrugName: "",
    Description: "",
    Purpose: "",
    Cost: "",
    image: null,
    ChemistName: "",
    ChemistLocation: "", // New field for chemist's location URL
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("DrugName", formData.DrugName);
    data.append("Description", formData.Description);
    data.append("Purpose", formData.Purpose);
    data.append("Cost", formData.Cost);
    data.append("image", formData.image);
    data.append("ChemistName", formData.ChemistName);
    data.append("ChemistLocation", formData.ChemistLocation);

    try {
      const response = await axios.post("/api/add_drug", data);
      setMessage("✅ " + response.data.message);
    } catch (err) {
      setMessage("❌ Failed to add drug");
      console.error(err);
    }
  };

  return (
    <div className="add-drug-wrapper">
      <h2>Add a New Drug</h2>
      <form onSubmit={handleSubmit} className="add-drug-form">
        <div className="form-row">
          <div className="form-group">
            <label>Drug Name</label>
            <input
              type="text"
              name="DrugName"
              value={formData.DrugName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Cost (Ksh)</label>
            <input
              type="number"
              name="Cost"
              value={formData.Cost}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Purpose</label>
          <input
            type="text"
            name="Purpose"
            value={formData.Purpose}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Drug Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Chemist Name</label>
          <input
            type="text"
            name="ChemistName"
            value={formData.ChemistName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Chemist Location (URL)</label>
          <input
            type="url"
            name="ChemistLocation"
            value={formData.ChemistLocation}
            onChange={handleChange}
            placeholder="e.g., https://www.google.com/maps/place/chemist-location"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit Drug
        </button>
      </form>

      {message && <p className="feedback">{message}</p>}
    </div>
  );
};

export default AddDrug;
