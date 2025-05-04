import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // For navigation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faEdit, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'; // Added logout icon

const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // For programmatic navigation

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("role");  // Remove the role from localStorage
    window.dispatchEvent(new Event("storage"));  // Trigger navbar update
    navigate("/");  // Redirect to homepage or login
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand Name / Logo */}
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo">MediChain</Link>
        </div>

        {/* Links */}
        <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          <Link to="/" className="navbar-link">
            <FontAwesomeIcon icon={faHome} className="navbar-icon" />
            Home
          </Link>
          <Link to="/about" className="navbar-link">
            <FontAwesomeIcon icon={faInfoCircle} className="navbar-icon" />
            About
          </Link>
          <Link to="/dashboard" className="navbar-link">
            <FontAwesomeIcon icon={faEdit} className="navbar-icon" />
            Update
          </Link>
          {/* Logout Button */}
          <button className="navbar-link logout-btn" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="navbar-icon" />
            Logout
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="navbar-hamburger" onClick={toggleMenu}>
          <span className="navbar-hamburger-icon">&#9776;</span>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
