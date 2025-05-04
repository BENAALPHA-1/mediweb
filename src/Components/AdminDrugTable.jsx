import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDrugTable = () => {
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch drugs
  const fetchDrugs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://benedictproject.pythonanywhere.com/api/admin/drugs");
      setDrugs(response.data);
    } catch (err) {
      setError("Failed to fetch drugs");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete drug by ID
  const handleDelete = async (drugId) => {
    try {
      await axios.delete(`https://benedictproject.pythonanywhere.com/api/admin/drug/${drugId}`);
      setDrugs(drugs.filter((drug) => drug.DrugID !== drugId)); // Remove deleted drug from state
    } catch (err) {
      console.error("Error deleting drug:", err);
    }
  };

  useEffect(() => {
    fetchDrugs(); // Fetch drugs on component mount
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="drug-table">
      <h2>Drugs</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Purpose</th>
            <th>Cost</th>
            <th>Chemist</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {drugs.map((drug) => (
            <tr key={drug.DrugID}>
              <td>{drug.DrugName}</td>
              <td>{drug.Purpose}</td>
              <td>{drug.Cost}</td>
              <td>{drug.ChemistName}</td>
              <td>
                <button onClick={() => handleDelete(drug.DrugID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDrugTable;
