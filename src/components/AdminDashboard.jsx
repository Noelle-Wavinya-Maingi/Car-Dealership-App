/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import RoleManagement from "./RoleManagement";
import { fetchUsers } from "./api";

const AdminDashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      console.log("Access denied!");
      navigate("/employee-dashboard");
    } else {
      fetchAllUsers();
    }
  }, []);

  const fetchAllUsers = async () => {
    try {
      const users = await fetchUsers() 
      setUsers(users);
    } catch (error) {
      console.error("Error fetching users: ", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Admin Dashboard</h1>
      <div className="card">
        <div className="card-body">
          <h2>Welcome {user.name}!</h2>
      <RoleManagement users={users} setUsers={setUsers} />
    </div>
    </div>
    </div>
  );
};

export default AdminDashboard;
