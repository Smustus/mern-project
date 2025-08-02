import React from "react";
import { Link } from "react-router";

const NavBar = () => {
  return (
    <nav>
      <h2>NavBar</h2>
      <Link to="/">Home</Link>
      <Link to="/create">Create</Link>
    </nav>
  );
};

export default NavBar;
