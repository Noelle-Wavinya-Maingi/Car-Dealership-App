// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import "./App.css";
import Login from "./components/Login";
import RoleManagement from "./components/RoleManagement";
import { UserProvider } from "./context/UserContext";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";
import ManagerDashboard from "./components/ManagerDashboard";

const App = () => {
  return (
    <Router>
      <UserProvider>
      <Navbar />
      <br></br>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/role-management" element={<RoleManagement />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
      </Routes>
      </UserProvider>
    </Router>
    
  );
};

export default App;
