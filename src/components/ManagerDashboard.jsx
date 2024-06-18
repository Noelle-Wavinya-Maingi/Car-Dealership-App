import { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { fetchDepartments, fetchTasks, fetchUsers } from "./api";
import { useUser } from "../context/UserContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const ManagerDashboard = () => {
  const [departments, setDepartments] = useState([]);
  const [departmentCompletionRates, setDepartmentCompletionRates] = useState({});
  const [departmentIncompleteTasks, setDepartmentIncompleteTasks] = useState({});
  const [bestPerformingDepartment, setBestPerformingDepartment] = useState('');
  const { user } = useUser();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersResponse, tasksResponse, departmentsResponse] = await Promise.all([
        fetchUsers(),
        fetchTasks(),
        fetchDepartments()
      ]);

      if (!usersResponse || !tasksResponse) {
        throw new Error("Failed to fetch data");
      }

      const users = usersResponse;
      const tasks = tasksResponse;
      const departmentData = departmentsResponse;

      // Group tasks by department
      const departmentTasks = {};
      tasks.forEach(task => {
        const userId = task.userId;
        const user = users.find(user => user.id === userId);
        if (user) {
          const departmentId = user.departmentId;
          if (!departmentTasks[departmentId]) {
            departmentTasks[departmentId] = [];
          }
          departmentTasks[departmentId].push(task);
        }
      });

      // Calculate completion rates and incomplete tasks
      const rates = {};
      const incompleteTasks = {};
      Object.keys(departmentTasks).forEach(departmentId => {
        const tasks = departmentTasks[departmentId];
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;
        const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        rates[departmentId] = completionRate;
        incompleteTasks[departmentId] = totalTasks - completedTasks;
      });

      // Determine best performing department
      const findBestDepartment = Object.keys(rates).reduce((a, b) => rates[a] > rates[b] ? a : b);
      const bestDepartmentName = departmentData.find(dep => dep.id === parseInt(findBestDepartment))?.name || 'Unknown Department';
      setBestPerformingDepartment(bestDepartmentName);

      setDepartmentCompletionRates(rates);
      setDepartmentIncompleteTasks(incompleteTasks);
      setDepartments(departmentData);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('An error occurred while fetching data. Please try again later.');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: departments.map(department => `${department.name} Department`),
    datasets: [
      {
        label: "Task Completion Rate (%)",
        data: departments.map(department => departmentCompletionRates[department.id]),
        backgroundColor: departments.map((_, i) => `rgba(54, 162, 235, ${0.2 + i * 0.1})`), // Example gradient effect
        borderColor: departments.map((_, i) => `rgba(54, 162, 235, ${1 - i * 0.1})`),
        borderWidth: 1,
        hoverBackgroundColor: departments.map((_, i) => `rgba(75, 192, 192, ${0.4 + i * 0.1})`),
        hoverBorderColor: departments.map((_, i) => `rgba(75, 192, 192, ${1 - i * 0.1})`),
      },
    ],
  };

  const lineChartData = {
    labels: departments.map(department => `${department.name} Department`),
    datasets: [
      {
        label: 'Incomplete Tasks',
        data: departments.map(department => departmentIncompleteTasks[department.id]),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
        tension: 0.1,
      },
    ],
  };

  const pieChartData = {
    labels: departments.map(department => `${department.name} Department`),
    datasets: [
      {
        label: 'Completion Rates',
        data: departments.map(department => departmentCompletionRates[department.id]),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
        hoverBackgroundColor: [
          'rgba(255, 99, 132, 0.4)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(255, 206, 86, 0.4)',
          'rgba(75, 192, 192, 0.4)',
          'rgba(153, 102, 255, 0.4)',
          'rgba(255, 159, 64, 0.4)'
        ],
        hoverBorderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
      },
    ],
  };
  
  const pieChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };
  

  return (
    <div className="dept-container mt-4">
      <h1>Welcome {user.name}!</h1>
  
      <div className="dept-card mt-4">
        <div className="dept-card-header">
          Task Completion Rates by Department
        </div>
        <div className="dept-card-body">
          <Bar data={chartData} />
        </div>
      </div>
  
      <div className="dept-card mt-4">
        <div className="dept-card-header">
          Incomplete Tasks By Department
        </div>
        <div className="dept-card-body">
          <Line data={lineChartData} />
        </div>
      </div>
  
      <div className="dept-card mt-4">
        <div className="dept-card-header">
          Best Performing Department
        </div>
        <div className="dept-card-body">
          <div style={{ width: '800px', height: '600px', margin: '0 auto' }}>
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
          <p className="mt-2">Best Performing Department: {bestPerformingDepartment}🎉🎉🎉🎉</p>
        </div>
      </div>
    </div>
  );  
};

export default ManagerDashboard;
