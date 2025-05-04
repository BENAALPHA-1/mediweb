import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedRole = localStorage.getItem("role");
        if (!storedRole) {
            navigate("/login"); // Redirect to login if no role is found
        } else {
            setRole(storedRole);
        }
    }, [navigate]);

    return (
        <div className="container">
            <h1>Welcome to MediChain</h1>

            {role === "admin" && (
                <div>
                    <h2>Admin Panel</h2>
                    <button className="btn">Manage Users</button>
                    <button className="btn">Update User Roles</button>
                    <button className="btn">Delete Any Drug</button>
                    <button className="btn">View All Drugs</button>
                </div>
            )}

            {role === "client" && (
                <div>
                    <h2>Client Panel</h2>
                    <button className="btn">View All Drugs</button>
                    <button className="btn">View My Drugs</button>
                    <button className="btn">Add Drug</button>
                    <button className="btn">Delete My Drugs</button>
                </div>
            )}

            {role === "user" && (
                <div>
                    <h2>User Panel</h2>
                    <button className="btn">View Available Drugs</button>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
