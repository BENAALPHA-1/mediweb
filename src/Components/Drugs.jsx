import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";

const FetchAllDrugs = () => {
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  // Get role from localStorage
  let userRole = null;
  const userString = localStorage.getItem("user");
  if (userString) {
    try {
      const user = JSON.parse(userString);
      userRole = user?.role;
    } catch (e) {
      console.error("Invalid user object in localStorage", e);
    }
  }

  const isAuthorized = ["user", "client", "admin"].includes(userRole);

  const fetchDrugs = async (query = "") => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://benedictproject.pythonanywhere.com//api/drugs?search=${query}`);
      const result = response.data;
      setDrugs(result);
      setNoResults(result.length === 0);
    } catch (err) {
      setError("Failed to fetch drugs");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrugs();
  }, []);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchDrugs(searchQuery);
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
            <p className="chemist-info">Chemist: {drug.ChemistName}</p>

            {/* Location Access */}
            <p className="chemist-location">
              Available at:{" "}
              {isAuthorized ? (
                <a
                  href={drug.ChemistLocation}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View location on map"
                >
                  <FaMapMarkerAlt style={{ color: "#ff5733", fontSize: "1.5rem", cursor: "pointer" }} />
                </a>
              ) : (
                <FaMapMarkerAlt
                  style={{ color: "#ff5733", fontSize: "1.5rem", cursor: "pointer" }}
                  title="Sign in to view location"
                  onClick={() => (window.location.href = "/login?reason=location")}
                />
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchAllDrugs;
