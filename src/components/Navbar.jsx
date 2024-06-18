import { Link, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { FaCar } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const { user } = useUser();

  // Check if current route is '/signup', '/login', or '/'
  const showNavbar = !["/signup", "/login", "/"].includes(location.pathname);

  if (!showNavbar) {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <FaCar />&nbsp;&nbsp;
          <i>ABC</i>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {!user && (
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/services">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
            {!user ? (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            ) : (
              <>
                {user.role === "manager" && (
                  <>
                  <li className="nav-item">
                      <Link className="nav-link" to="/manager-dashboard">
                        Dashboard
                      </Link>
                      </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/manager/users">
                        User Management
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/manager/tasks">
                        Task Management
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/manager/departments">
                        Department Management
                      </Link>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <Link className="nav-link" to="/logout">
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
