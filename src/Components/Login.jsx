import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ added useLocation
import mediImage from "../images/medi.png";
import { Link } from "react-router-dom";

const Login = () => {
    const [UserName, setUserName] = useState("");
    const [UserPassword, setUserPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // ✅ access query parameters
    const queryParams = new URLSearchParams(location.search);
    const reason = queryParams.get("reason"); // ✅ get reason from URL

    useEffect(() => {
        const paymentCompleted = localStorage.getItem('paymentCompleted');
        if (!paymentCompleted) {
            navigate('/plans');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        setSuccess(false);

        try {
            const response = await fetch("/api/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ UserName, UserPassword }),
            });

            const data = await response.json();
            console.log("DEBUG: API Response:", data);

            if (response.ok) {
                localStorage.setItem("role", data.role);
                localStorage.setItem("user", JSON.stringify({ role: data.role }));
                window.dispatchEvent(new Event("storage"));
                setSuccess(true);

                setTimeout(() => {
                    if (data.role === "client") {
                        navigate("/client");
                    } else if (data.role === "admin") {
                        navigate("/admin");
                    } else {
                        navigate("/");
                    }
                }, 1000);
            } else {
                setError(data?.error || "Invalid username or password.");
            }
        } catch (error) {
            console.error("DEBUG: Fetch error:", error);
            setError("Server error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // const handleLogout = () => {
    //     localStorage.removeItem("role");
    //     window.dispatchEvent(new Event("storage"));
    //     navigate("/");
    // };

    return (
        <div className="container">
            {/* Image section */}
            <div className="image-box">
                <img src={mediImage} alt="MediChain Illustration" />
            </div>

            {/* Form section */}
            <div className="form-box login">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>

                    {/* ✅ Show reason-based notice */}
                    {reason === "location" && (
                        <p className="notice-message text-red-500 mb-2">
                            You must sign in to access chemist locations.
                        </p>
                    )}

                    {error && <p className="error-message">{error}</p>}

                    <div className="input-box">
                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={UserName} 
                            onChange={(e) => setUserName(e.target.value)} 
                            required 
                        />
                        <i className="bx bxs-user"></i>
                    </div>

                    <div className="input-box">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={UserPassword} 
                            onChange={(e) => setUserPassword(e.target.value)} 
                            required 
                        />
                        <i className="bx bxs-lock-alt"></i>
                    </div>

                    <div className="forgot-link">
                        <a href="/forgot-password">Forgot password?</a>
                    </div>
                    <p>
                        Don’t have an account? <Link to="/signup">Sign up here</Link>
                    </p>
                    <button
                        type="submit"
                        className={`fancy-login-btn ${loading ? "loading" : ""} ${success ? "success" : ""}`}
                        disabled={loading || success}
                    >
                        {success ? (
                            <span className="checkmark">&#10003;</span>
                        ) : loading ? (
                            <span className="spinner-circle"></span>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
