/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import { createNewDepartment, fetchDepartments, fetchUsers } from "./api";
import { FaBuilding } from "react-icons/fa";

const ManageDepartment = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState("");

  useEffect(() => {
    if (!user || user.role !== "manager") {
      console.log("Access Denied");
      navigate("/employee-dashboard");
    } else {
      getDepartmentsAndUsers();
    }
  }, []);

  const getDepartmentsAndUsers = async () => {
    try {
      const [departmentData, userData] = await Promise.all([
        fetchDepartments(),
        fetchUsers(),
      ]);

      const departmentsWithMemberCount = departmentData.map((department) => ({
        ...department,
        membersCount: userData.filter((user) => user.departmentId === department.id.toString()).length,
      }));
      setDepartments(departmentsWithMemberCount);
    } catch (error) {
      console.error("Error fetching departments and users: ", error);
      throw error;
    }
  };

  const handleCreateDepartment = async () => {
    try {
      const department = await createNewDepartment({ name: newDepartment });
      setDepartments([...departments, { ...department, membersCount: 0 }]);
      setNewDepartment("");
    } catch (error) {
      console.error("Error creating department: ", error);
    }
  };

  return (
    <div className="manager-container mt-5">
      <h2 className="mb-4">
        <FaBuilding /> Manage Departments
      </h2>
      <div className="card mb-4 custom-card">
        <div className="card-body">
          <h5 className="card-title">Create Department</h5>
          <form onSubmit={handleCreateDepartment}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Department Name"
              value={newDepartment}
              onChange={(e) => setNewDepartment(e.target.value)}
              required
            />
            <button className="btn btn-primary" >
              Create
            </button>
          </div>
          </form>
        </div>
      </div>
      <h3>Existing Departments</h3>
      <ul className="list-group">
        {departments.map((department) => (
          <li key={department.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{department.name}</span>
            <span className="badge bg-primary rounded-pill">{department.membersCount} Members</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageDepartment;
