import React from "react";
import "./Header.css"; // You can create a CSS file for styling

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <img src="doctor.png" alt="Header Image" className="header-image" />
        <div className="text-container">
          <h1>Welcome to Our De-Addiction Network</h1>
          <p>Your Partner in Recovery</p>
          <button className="cta-button">Join Us</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
