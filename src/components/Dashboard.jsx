// import React from "react";
import { useUser } from "../context/UserContext";
import AdminDashboard from "./AdminDashboard";
import ManagerDashboard from "./ManagerDashboard";
import EmployeeDashboard from "./EmployeeDashboard";

const Dashboard = () => {
  const { user } = useUser();

  // Conditional rendering based on user role
  if (user.role === "admin") {
    return <AdminDashboard />;
  } else if (user.role === "manager") {
    return <ManagerDashboard />;
  } else {
    return <EmployeeDashboard />;
  }
};

export default Dashboard;
