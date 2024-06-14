import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import RoleManagement from "./RoleManagement";
import axios from "axios";

const AdminDashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      console.log("Access denied!");
      navigate("/employee-dashboard");
    } else {
      fetchUsers();
    }
  }, [user, navigate]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "https://json-server-vkfa.onrender.com/users"
      );
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users: ", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <RoleManagement users={users} setUsers={setUsers} />
    </div>
  );
};

export default AdminDashboard;
