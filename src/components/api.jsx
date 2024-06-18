import axios from "axios";

const BASE_URL = "https://json-server-vkfa.onrender.com";

//fetching user data from the BASE_URL
export const fetchUsers = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/users`);
    return res.data;
  } catch (error) {
    console.error("Error fetching users: ", error);
    throw error;
  }
};

//Fetching tasks from the base url
export const fetchTasks = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/todos`);
    return res.data;
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    throw error;
  }
};

//fetching the tasks by id from the base url
export const updateTasks = async (id, updatedData) => {
  try {
    const res = await axios.patch(`${BASE_URL}/todos/${id}`, updatedData);
    return res.data;
  } catch (error) {
    console.error("Error fetching tasks by Id: ", error);
    throw error;
  }
};

//fetching the departments from the base Url
export const fetchDepartments = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/departments`);
    return res.data;
  } catch (error) {
    console.error("Error fetching departments: ", error);
    throw error;
  }
};

//create new department
export const createNewDepartment = async (department) => {
  try {
    const res = await axios.post(`${BASE_URL}/departments`, department);
    return res.data;
  } catch (error) {
    console.error("Error creating a new department: ", error);
    throw error;
  }
};

//Assign a department to a user
export const assignDepartment = async (userId, departmentId) => {
  try {
    const res = await axios.patch(`${BASE_URL}/users/${userId}`, {
      departmentId,
    });
    return res.data;
  } catch (error) {
    console.error("Error assigning a user a department: ", error);
    throw error;
  }
};

//create a new task
export const createTask = async (task) => {
  try {
    const res = await axios.post(`${BASE_URL}/todos`, task);
    return res.data;
  } catch (error) {
    console.error("Error creating a new task: ", error);
    throw error;
  }
};

//Update the tasks
export const updateTask = async (taskId, updates) => {
  try {
    const res = await axios.patch(`${BASE_URL}/todos/${taskId}`, updates);
    return res.data;
  } catch (error) {
    console.error("Error updating the task: ", error);
    throw error;
  }
};

//Delete the task
export const deleteTask = async (taskId) => {
  try {
    const res = await axios.delete(`${BASE_URL}/todos/${taskId}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting the taks: ", error);
    throw error;
  }
};

//Delete a user
export const removeUser = async (userId) => {
  try {
    const res = await axios.delete(`${BASE_URL}/users/${userId}`);
    return res.data;
  } catch (error) {
    console.error("Error removing the user: ", error);
  }
};
