import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import ClientNavbar from "./ClientNavbar";
import UserNavbar from "./UserNavbar";

const Navbar = () => {
  const [role, setRole] = useState(undefined); // <-- undefined initially

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    setRole(savedRole || "user"); // <-- if no role, default to "user"
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedRole = localStorage.getItem("role");
      setRole(updatedRole || "user"); // <-- again, default to "user"
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (role === undefined) {
    return null; // or a loading spinner if you want
  }

  if (role === "admin") return <AdminNavbar />;
  if (role === "client") return <ClientNavbar />;
  return <UserNavbar />;
};

export default Navbar;
