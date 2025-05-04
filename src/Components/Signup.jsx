import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    chemistName: "",
    chemistLocation: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const plan = localStorage.getItem("selectedPlan");
    if (plan) {
      setRole("client"); // Switch to client signup if plan was chosen
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSwitch = () => {
    if (role === "client") {
      setRole("user");
      localStorage.removeItem("selectedPlan");
    } else {
      navigate("/plans");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const payload =
      role === "user"
        ? {
            role,
            UserName: formData.fullName,
            UserEmail: formData.email,
            UserPhone: formData.phone,
            UserPassword: formData.password,
            selectedPlan: "",
          }
        : {
            role,
            ClientName: formData.fullName,
            ClientEmail: formData.email,
            ClientPhone: formData.phone,
            ClientPosition: formData.position,
            ChemistName: formData.chemistName,
            ChemistLocation: formData.chemistLocation,
            ClientPassword: formData.password,
            selectedPlan: localStorage.getItem("selectedPlan") || "",
          };

    try {
      const response = await fetch("https://benedictproject.pythonanywhere.com/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert(`Signup failed: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("An error occurred during signup.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>{role === "client" ? "Client Signup" : "User Signup"}</h1>

        <p className="role-toggle">
          {role === "client" ? (
            <>
              Not a Client?{" "}
              <span onClick={handleRoleSwitch}>Sign up as a User</span>
            </>
          ) : (
            <>
              Not a User?{" "}
              <span onClick={handleRoleSwitch}>Sign up as a Client</span>
            </>
          )}
        </p>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <div className="input-box">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {role === "client" && (
            <>
              <div className="input-group">
                <div className="input-box">
                  <input
                    type="text"
                    name="position"
                    placeholder="Position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-box">
                  <input
                    type="number"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="input-group">
                <div className="input-box">
                  <input
                    type="text"
                    name="chemistName"
                    placeholder="Chemist Name"
                    value={formData.chemistName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-box">
                  <input
                    type="url"
                    name="chemistLocation"
                    placeholder="Paste Google Maps Link of Chemist Location"
                    value={formData.chemistLocation}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <p className="location-note">
                * Get your location: Google Maps ➔ Find chemist ➔ Share ➔ Copy Link
              </p>
            </>
          )}

          <div className="input-group">
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
