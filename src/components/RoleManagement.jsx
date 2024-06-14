import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";

const RoleManagement = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!user || user.rol !== "admin") {
      alert("Access denied!");
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
      alert("An error occured. Please try again later.");
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await axios.patch(
        `https://json-server-vkfa.onrender.com/users/${userId}`,
        {
          role: newRole,
        }
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );

      console.log(res.data);

      alert("Role updated successfully.");
    } catch (error) {
      console.error("Error updating role: ", error);
      alert("An error occured. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Role Management</h1>
      <table>
        <thead>
          <tr></tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Change Role</th>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <select
                  value={u.role}
                  onChange={(e) => handleRoleChange(u.id, e.target.value)}
                >
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleManagement;
