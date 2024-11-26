import React from "react";
import { Link } from "react-router-dom";

import '../style.css'

const Navbar = () => {
  return (
    
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">RBAC SYSTEM</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item active">
      <Link to="/" className="nav-link" id='navLink'>Home</Link>
      </li>
      <li class="nav-item">
      <Link to="/login" className="nav-link" id='navLink'>Login</Link>
      </li>
    </ul>
  </div>
</nav>
  );
};

export default Navbar;