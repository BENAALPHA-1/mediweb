import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faInfoCircle,
  faPhoneAlt,
  faSignInAlt,
  faUserPlus,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Listen for storage changes (like logout from another tab)
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedRole = localStorage.getItem("role");
      setRole(updatedRole);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("role");
    setRole(null);
    window.dispatchEvent(new Event("storage")); // update other tabs
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand Name / Logo */}
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo">MediChain</Link>
        </div>

        {/* Navigation Links */}
        <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          <Link to="/" className="navbar-link">
            <FontAwesomeIcon icon={faHome} className="navbar-icon" />
            Home
          </Link>
          <Link to="/about" className="navbar-link">
            <FontAwesomeIcon icon={faInfoCircle} className="navbar-icon" />
            About
          </Link>
          <Link to="/contact" className="navbar-link">
            <FontAwesomeIcon icon={faPhoneAlt} className="navbar-icon" />
            Contact
          </Link>

          {/* Show if NOT logged in */}
          {!role && (
            <>
              <Link to="/login" className="navbar-link">
                <FontAwesomeIcon icon={faSignInAlt} className="navbar-icon" />
                Sign In
              </Link>
              <Link to="/signup" className="navbar-link">
                <FontAwesomeIcon icon={faUserPlus} className="navbar-icon" />
                Sign Up
              </Link>
            </>
          )}

          {/* Show if logged in */}
          {role && (
            <button className="navbar-link logout-btn" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} className="navbar-icon" />
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="navbar-hamburger" onClick={toggleMenu}>
          <span className="navbar-hamburger-icon">&#9776;</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
