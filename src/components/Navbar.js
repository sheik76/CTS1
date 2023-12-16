import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import "../styles/Navbar.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  const handleLogout = () => {
    // Perform any necessary logout logic
    setIsLoggedIn(false);
  };

  return (
    <div className="navbar">
      <div className="headerSide" id={openLinks ? "open" : "close"}>
        <img src={Logo} alt="no img" />
        <div className="hiddenLinks">
          <Link to="/"> SignIn </Link>
          {isLoggedIn && (
            <>
              <Link to="/about"> About </Link>
              <Link to="/signup"> SignUP </Link>
            </>
          )}
        </div>
      </div>
      <div className="footerSide">
        <Link to="/"> Home </Link>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/about"> About </Link>
            <Link to="/signup"> SignUP </Link>
          </>
        )}
        <button onClick={toggleNavbar}>Toggle Navbar</button>
      </div>
    </div>
  );
}

export default Navbar;
