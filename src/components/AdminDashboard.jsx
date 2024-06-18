import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import RoleManagement from "./RoleManagement";
import { fetchUsers } from "./api";
import "../assets/css/adminDashboard.css";

const AdminDashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (!user) {
      console.log("Access denied!");
      navigate("/employee-dashboard");
      return;
    }

    if (user.role !== "admin") {
      console.log("Access denied!");
      navigate("/employee-dashboard");
      return;
    }

    fetchAllUsers();
  }, [user, navigate]);

  const fetchAllUsers = async () => {
    try {
      const users = await fetchUsers();
      setUsers(users);
    } catch (error) {
      console.error("Error fetching users: ", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-dashboard-container" style={{ marginTop: "80px" }}>
      <h1 className="mb-4">Admin Dashboard</h1>
      <div className="card" style={{ width: "1100px" }}>
        <div className="card-body">
          <h2>Welcome {user.name}!</h2>
          <RoleManagement users={users} setUsers={setUsers} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
