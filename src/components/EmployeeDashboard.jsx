import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { fetchTasks, updateTasks } from "./api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import "../assets/css/employeeDashboard.css";

const EmployeeDashboard = () => {
  const { user } = useUser();
  const [tasks, setTasks] = useState([]);
  const [totalTasks, setTotalTasks] = useState([]);
  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [incompleteCount, setIncompleteCount] = useState(0);
  const [updatingTaskIds, setUpdatingTaskIds] = useState(new Set());

  useEffect(() => {
    const getTasks = async () => {
      try {
        const allTasks = await fetchTasks();
        setTasks(allTasks);
      } catch (error) {
        console.error("Error fetching tasks: ", error);
      }
    };
    getTasks();
  }, []);

  useEffect(() => {
    if (user) {
      const userTasks = tasks.filter((task) => task.userId === user.id);
      setTotalTasks(userTasks);
      setIncompleteTasks(userTasks.filter((task) => !task.completed));
      setCompletedCount(userTasks.filter((task) => task.completed).length);
      setIncompleteCount(userTasks.filter((task) => !task.completed).length);
    }
  }, [tasks, user]);

  const handleCheckBoxChange = async (taskId) => {
    if (updatingTaskIds.has(taskId)) {
      return;
    }

    try {
      setUpdatingTaskIds((prev) => new Set(prev).add(taskId));
      const updatedTask = await updateTasks(taskId, { completed: true });
      const updatedTasks = incompleteTasks.filter((task) => task.id !== taskId);
      setIncompleteTasks(updatedTasks);
      setCompletedCount(completedCount + 1);
      setIncompleteCount(incompleteCount - 1);

      const checkedTasks =
        JSON.parse(localStorage.getItem("checkedTasks")) || [];
      localStorage.setItem(
        "checkedTasks",
        JSON.stringify([...checkedTasks, taskId])
      );

      alert(
        `Task '${
          updatedTask.title.charAt(0).toUpperCase() + updatedTask.title.slice(1)
        }' marked as complete!`
      );
    } catch (error) {
      console.error("Error marking task complete: ", error);
      alert("An error occurred while marking the task as complete.");
    } finally {
      setUpdatingTaskIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(taskId);
        return newSet;
      });
    }
  };

  const chartData = {
    labels: ["Complete", "Incomplete"],
    datasets: [
      {
        label: "Tasks",
        data: [completedCount, incompleteCount],
        backgroundColor: ["#4caf50", "#ff9800"],
        borderWidth: 1,
        borderColor: ["#388e3c", "#f57c00"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Task Completion Status",
      },
    },
  };

  if (!user) {
    return <div>Loading.....</div>;
  }

  return (
    <div className="dashboard" style={{ marginTop: "80px" }}>
      <h1>Welcome, {user.name}</h1>
      <div className="stats">
        <div className="card">
          <h3>Total Tasks</h3>
          <p>{totalTasks.length} Tasks</p>
        </div>
        <div className="card">
          <h3>Completed Tasks</h3>
          <p>{completedCount} Tasks</p>
        </div>
        <div className="card">
          <h3>Incomplete Tasks</h3>
          <p>{incompleteCount} Tasks</p>
        </div>
      </div>

      <div className="chart card" style={{ width: "1000px" }}>
        <Bar data={chartData} options={chartOptions} />
      </div>

      <h2>Your Tasks</h2>
      <div className="leaflet">
        {incompleteTasks.length === 0 ? (
          <p>No Incomplete Tasks!</p>
        ) : (
          <div className="task-list">
            {incompleteTasks.map((task) => (
              <div key={task.id} className="task">
                <h6 className="task-title">
                  {task.title.charAt(0).toUpperCase() + task.title.slice(1)}
                </h6>
                <div className="todo">
                  <input
                    type="checkbox"
                    checked={updatingTaskIds.has(task.id)}
                    disabled={updatingTaskIds.has(task.id)}
                    onChange={() => handleCheckBoxChange(task.id)}
                  />
                  <p className="status-pill">Incomplete</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
