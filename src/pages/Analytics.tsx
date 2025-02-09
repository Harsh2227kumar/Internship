import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { useAuth } from "../context/AuthContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const facultyData = [
  { name: 'Faculty A', assigned: 15, completed: 12 },
  { name: 'Faculty B', assigned: 12, completed: 8 },
  { name: 'Faculty C', assigned: 18, completed: 15 },
  { name: 'Faculty D', assigned: 10, completed: 7 },
];

export default function Analytics() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const taskStatusData = {
    labels: ['Completed', 'In Progress', 'Pending'],
    datasets: [
      {
        data: [42, 28, 30],
        backgroundColor: [
          'rgba(34, 197, 94, 0.6)',
          'rgba(59, 130, 246, 0.6)',
          'rgba(234, 179, 8, 0.6)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(59, 130, 246)',
          'rgb(234, 179, 8)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const taskTrendData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Completed Tasks',
        data: [10, 15, 8, 12],
        borderColor: 'rgb(34, 197, 94)',
        tension: 0.1,
      },
      {
        label: 'New Tasks',
        data: [12, 19, 10, 15],
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.1,
      },
    ],
  };

  const facultyPerformanceData = {
    labels: facultyData.map(f => f.name),
    datasets: [
      {
        label: 'Assigned Tasks',
        data: facultyData.map(f => f.assigned),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
      },
      {
        label: 'Completed Tasks',
        data: facultyData.map(f => f.completed),
        backgroundColor: 'rgba(34, 197, 94, 0.6)',
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Total Tasks</h3>
          <p className="text-3xl font-bold text-indigo-600">100</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Completed</h3>
          <p className="text-3xl font-bold text-green-600">42</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">In Progress</h3>
          <p className="text-3xl font-bold text-blue-600">28</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">30</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Task Status Distribution</h3>
          <div className="h-64">
            <Pie data={taskStatusData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Task Completion Trend</h3>
          <div className="h-64">
            <Line data={taskTrendData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
      </div>
      ) : (
      <p>Loading...</p>


      {isAdmin && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Faculty Performance</h3>
          <div className="h-80">
            <Bar
              data={facultyPerformanceData}
              options={{ maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
