import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import RoleManagement from "./components/RoleManagement";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";
import ManagerDashboard from "./components/ManagerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./components/Logout";
import ManageDepartment from "./components/ManageDepartment";
import ManageTasks from "./components/ManageTasks";
import ManageUser from "./components/ManageUsers";
import Testimonials from "./components/testimonials";

const App = () => {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/role-management" element={<RoleManagement />} />
          <Route
            path="/employee-dashboard"
            element={
              <ProtectedRoute component={EmployeeDashboard} role="employee" />
            }
          />
          <Route
            path="/admin-dashboard"
            element={<ProtectedRoute component={AdminDashboard} role="admin" />}
          />
          <Route
            path="/manager-dashboard"
            element={
              <ProtectedRoute component={ManagerDashboard} role="manager" />
            }
          />
          <Route
            path="/manager-departments"
            element={
              <ProtectedRoute component={ManageDepartment} role="manager" />
            }
          />
          <Route
            path="/manager-tasks"
            element={<ProtectedRoute component={ManageTasks} role="manager" />}
          />
          <Route
            path="/manager-users"
            element={<ProtectedRoute component={ManageUser} role="manager" />}
          />
          <Route
            path="/about"
            element={<Testimonials />}
          />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;
