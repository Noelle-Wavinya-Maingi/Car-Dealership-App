import { useEffect, useState } from "react";
import {
  assignDepartment,
  createTask,
  deleteTask,
  fetchDepartments,
  fetchTasks,
  fetchUsers,
  updateTask,
} from "./api";
import Select from "react-select";
import "../assets/css/manageTask.css";

const ManageTasks = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskDetails, setTaskDetails] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, tasksData, departmentsData] = await Promise.all([
          fetchUsers(),
          fetchTasks(),
          fetchDepartments(),
        ]);
        setUsers(usersData);
        setTasks(tasksData);
        setDepartments(departmentsData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const handleUserChange = (selectedOption) => {
    setSelectedUser(selectedOption);
  };

  const handleTaskChange = (selectedOption) => {
    setSelectedTask(selectedOption);
    setTaskDetails(selectedOption ? selectedOption.details : "");
  };

  const handleTaskDetailsChange = (e) => {
    setTaskDetails(e.target.value);
  };

  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleCreateTask = async () => {
    if (newTask && selectedUser) {
      const task = {
        title: newTask,
        completed: false,
        userId: selectedUser.value,
      };
      try {
        const createdTask = await createTask(task);
        setTasks([...tasks, createdTask]);
        setNewTask("");
      } catch (error) {
        console.error("Error creating tasks: ", error);
      }
    }
  };

  const handleUpdateTask = async () => {
    if (selectedTask && taskDetails) {
      try {
        const updatedTask = await updateTask(selectedTask.value, {
          details: taskDetails,
        });
        setTasks(
          tasks.map((task) =>
            task.id === selectedTask.value ? updatedTask : task
          )
        );
        setSelectedTask(null);
        setTaskDetails("");
      } catch (error) {
        console.error("Error updating task: ", error);
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  const handleAssignDepartment = async (userId, departmentId) => {
    try {
      await assignDepartment(userId, departmentId);
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, departmentId } : user
        )
      );
    } catch (error) {
      console.error("Error assigning department: ", error);
    }
  };

  const userOptions = users.map((user) => ({
    value: user.id,
    label: user.name,
  }));
  const taskOptions = tasks.map((task) => ({
    value: task.id,
    label: task.title,
  }));
  const departmentOptions = departments.map((department) => ({
    value: department.id,
    label: department.name,
  }));

  return (
    <div className="manage-tasks-container" style={{ marginTop: "80px" }}>
      <h1 className="page-title">Manage Tasks</h1>

      <div className="actions-container">
        <div className="action-box task-creation">
          <h2>Create Task</h2>
          <Select
            options={userOptions}
            onChange={handleUserChange}
            placeholder="Select User"
            className="select-input"
          />
          <input
            type="text"
            value={newTask}
            onChange={handleNewTaskChange}
            placeholder="Task Title"
            className="text-input"
          />
          <button className="btn create-btn" onClick={handleCreateTask}>
            Create Task
          </button>
        </div>

        <div className="action-box task-update">
          <h2>Edit Task</h2>
          <Select
            options={taskOptions}
            onChange={handleTaskChange}
            placeholder="Select Task"
            className="select-input"
          />
          <input
            type="text"
            value={taskDetails}
            onChange={handleTaskDetailsChange}
            placeholder="Task Details"
            className="text-input"
          />
          <button className="btn update-btn" onClick={handleUpdateTask}>
            Update Task
          </button>
        </div>

        <div className="action-box department-assignment">
          <h2>Assign Department</h2>
          <Select
            options={userOptions}
            onChange={handleUserChange}
            placeholder="Select User"
            className="select-input"
          />
          <Select
            options={departmentOptions}
            onChange={(option) =>
              handleAssignDepartment(selectedUser.value, option.value)
            }
            placeholder="Select Department"
            className="select-input"
          />
          <button className="btn" onClick={handleUpdateTask}>
            Assign Department
          </button>
        </div>
      </div>

      <h2>Task List</h2>
      <div className="task-list">
        <div className="tasks-grid">
          {tasks.map((task) => (
            <div key={task.id} className="task-card">
              <div className="task-content">
                <h3 className="task-title">
                  {task.title.charAt(0).toUpperCase() + task.title.slice(1)}
                </h3>
                <span
                  className={`task-status ${
                    task.completed ? "completed" : "incomplete"
                  }`}
                >
                  {task.completed ? "Completed" : "Incomplete"}
                </span>
              </div>
              <button
                className="btn delete-btn"
                onClick={() => handleDeleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageTasks;
