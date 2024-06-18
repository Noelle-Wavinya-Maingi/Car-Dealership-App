import { useEffect, useState } from "react";
import { fetchUsers, removeUser } from "./api";
import { FaTrash } from "react-icons/fa";
import "../assets/css/manageUser.css";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUsers = await fetchUsers();

        const filteredUsers = fetchedUsers.filter(
          (user) => user.role !== "admin"
        );
        setUsers(filteredUsers);
      } catch (error) {
        setErrorMessage("Failed to load users!");
        console.error("Error fetching users: ", error);
      }
    };
    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await removeUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
      setErrorMessage(`User ${userId} deleted sucessfully.`);
    } catch (error) {
      setErrorMessage("Failed to delete user!");
      console.error("Error deleting user: ", error);
    }
  };

  return (
    <div className="manage-user-container" style={{ marginTop: "80px" }}>
      <h2 className="manage-user-page-title">Manage Users</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>
              <td>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="delete-button"
                >
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUser;
