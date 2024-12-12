// src/components/Navbar.js
import React from 'react';
import img1 from "./img/logo.png"
   

const Navbar = () => {
    const navbarStyle = {
        backgroundColor: '#0057B7',
      };
      
  return (
    <nav className="navbar mb-4 fixed-top" style={navbarStyle}>
      <div className="container">
        <a className="navbar-brand" href="#">
          <img src={img1} alt="DePaul University" class="img-fluid" />
        </a>
      </div>
      <hr />
    </nav>
  );
};

export default Navbar;
