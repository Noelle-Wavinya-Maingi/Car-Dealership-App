import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, role, ...rest }) => {
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!storedUser || storedUser.role !== role) {
    // Redirect to login or appropriate route if user not logged in or role does not match
    return <Navigate to="/login" />;
  }

  return <Component {...rest} />;
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  role: PropTypes.string.isRequired,
};

export default ProtectedRoute;
