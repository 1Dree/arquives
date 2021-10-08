import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import "./header.css";

export default function Header() {
  const location = useLocation();
  const path = location.pathname;

  if (path === "/dashboard" || path === "/home") {
    return (
      <div id="header">
        <div className="container">
          <div id="header-logo">
            <h3>Arquives</h3>
          </div>

          <nav>
            <Link to="/home" className={path === "/home" ? "active" : ""}>
              Home
            </Link>

            <Link
              to="/dashboard"
              className={path === "/dashboard" ? "active" : ""}
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </div>
    );
  }

  return null;
}
