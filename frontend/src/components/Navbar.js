import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle,FaSearch, FaComments } from "react-icons/fa"; // Import profile icon from Font Awesome or other library

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const navigate = useNavigate();

  // Check if the user is logged in by checking for the auth token in localStorage
  const isLoggedIn = !!localStorage.getItem("authToken");

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    // Remove auth token from localStorage to log out the user
    localStorage.removeItem("authToken");
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="navbar">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h2 style={{ textAlign: "start", color: "white" }}>YUM FIND</h2>
      </Link>

      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          HOME
        </Link>

        <Link
          to="/spoonacular"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          FIND RECIPE
        </Link>

        <Link
          to="/add-recipe"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          ADD RECIPE
        </Link>

        

        {isLoggedIn ? (
          <div className="profile-section">
             <Link to="/spoonacular">
              <FaSearch className="profile-icon" /> {/* Profile Icon */}
            </Link>
            <Link to="/profile">
              <FaUserCircle className="profile-icon" /> {/* Profile Icon */}
            </Link>
            <button onClick={handleLogout}>LOGOUT</button>
          </div>
        ) : (
          <button onClick={() => setMenu("login")}>
            <Link to="/login" className={menu === "login" ? "active" : ""}>
              LOGIN
            </Link>
          </button>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
