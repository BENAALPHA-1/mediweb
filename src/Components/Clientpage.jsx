import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";

const FetchAllDrugs = () => {
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Manage search input
  const [noResults, setNoResults] = useState(false); // Flag for no results found

  // Function to fetch drugs based on search query
  const fetchDrugs = async (query = "") => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://benedictproject.pythonanywhere.com/api/drugs?search=${query}`);
      const result = response.data;
      setDrugs(result);

      // If no drugs are found, show "No results found"
      setNoResults(result.length === 0);
    } catch (err) {
      setError("Failed to fetch drugs");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrugs(); // Initial fetch without search
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle form submit (trigger search)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchDrugs(searchQuery); // Trigger fetch with search query
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="drug-container">
      {/* Search Bar */}
      <div className="search-form">
        <input
          type="text"
          placeholder="Search by Name or Purpose"
          className="search-input"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="search-button" onClick={handleSearchSubmit}>
          Search
        </button>
      </div>

      {/* No Results Found */}
      {noResults && <p className="no-results-text">No results found</p>}

      {/* Display Drugs */}
      <div className="drug-list">
        {drugs.map((drug) => (
          <div key={drug.DrugID} className="drug-card">
            <img
              src={`https://benedictproject.pythonanywhere.com/static/images/${drug.Image}`}
              alt={drug.DrugName}
              className="drug-image"
            />
            <h3 className="drug-name">{drug.DrugName}</h3>
            <p className="drug-price">Ksh {drug.Cost}</p>
            <p className="drug-purpose">Purpose: {drug.Purpose}</p>
            <p className="drug-description">{drug.Description}</p>

            {/* Chemist Name */}
            <p className="chemist-info">
              Chemist: {drug.ChemistName}
            </p>

            {/* Location Icon as Link */}
            <p className="chemist-location">
              Available at:{" "}
              <a
                href={drug.ChemistLocation}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaMapMarkerAlt
                  style={{ color: "#ff5733", fontSize: "1.5rem" }}
                />
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchAllDrugs;
