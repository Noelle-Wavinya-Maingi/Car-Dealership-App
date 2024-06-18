import axios from "axios";
import PropTypes from "prop-types";
import "../assets/css/roleManagement.css";

const RoleManagement = ({ users, setUsers }) => {
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
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="role-management-container">
      <h2>Role Management</h2>
      <div className="table-responsive">
        <table
          className="table table-striped table-bordered"
          style={{ width: "1200px" }}
        >
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Change Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role.charAt(0).toUpperCase() + u.role.slice(1)}</td>
                <td>
                  <select
                    className="form-control"
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
    </div>
  );
};

RoleManagement.propTypes = {
  users: PropTypes.array.isRequired,
  setUsers: PropTypes.func.isRequired,
};

export default RoleManagement;
