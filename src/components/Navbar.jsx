import { Link } from "react-router-dom";
import "../App.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Movie Discovery
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/top-rated">Top Rated</Link>
        <Link to="/watchlist">Watchlist</Link>
        <Link to="/credits">Credits</Link>
      </div>
    </nav>
  );
}

export default Navbar;
