import "./NavBar.css";
import { Link } from "react-router";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <Link to="/create" className="navbar-link">
          Create
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
