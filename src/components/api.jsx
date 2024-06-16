import axios from "axios";

const BASE_URL = "https://json-server-vkfa.onrender.com";

//fetching user data from the BASE_URL
export const fetchUsers = async () => {
  const res = await axios.get(`${BASE_URL}/users`);
  return res.data;
};

//Fetching tasks from the base url
export const fetchTasks = async () => {
  const res = await axios.get(`${BASE_URL}/todos`);

  console.log(res.data);
  return res.data;
};

//fetching the tasks by id from the base url
export const updateTasks = async (id, updatedData) => {
  const res = await axios.patch(`${BASE_URL}/todos/${id}`, updatedData);
  return res.data;
};
