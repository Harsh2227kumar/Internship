import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTaskStore } from '../store/taskStore';

import { CheckCircle, Clock, AlertTriangle, Plus } from 'lucide-react';
import TaskProgress from '../components/TaskProgress';
import TaskList from '../components/TaskList';
import TaskModal from '../components/TaskModal';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { tasks } = useTaskStore(); 

  // Define filterTasks function
  const filterTasks = ({ status }: { status: string }) => tasks.filter((task) => task.status === status);

  // ✅ Add the missing state
  const [isTaskModalOpen, setIsTaskModalOpen] = React.useState(false);

  const pendingTasks = filterTasks({ status: 'pending' });
  const inProgressTasks = filterTasks({ status: 'in_progress' });
  const completedTasks = filterTasks({ status: 'completed' });

  const completionPercentage = completedTasks.length
    ? (completedTasks.length / tasks.length) * 100
    : 0;

  const stats = [
    { name: 'Pending Tasks', value: pendingTasks.length, icon: Clock, color: 'text-yellow-500' },
    { name: 'In Progress', value: inProgressTasks.length, icon: AlertTriangle, color: 'text-blue-500' },
    { name: 'Completed', value: completedTasks.length, icon: CheckCircle, color: 'text-green-500' },
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* User Greeting & Add Task Button */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Hello, {user?.name || 'Guest'}
          </h1>
          <button
            onClick={() => setIsTaskModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Task
          </button>
        </div>

        {/* Task Statistics */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg p-5">
              <div className="flex items-center">
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                <div className="ml-5">
                  <dt className="text-sm font-medium text-gray-500">{stat.name}</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stat.value}</dd>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Task Progress & Recent Tasks */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Task Progress</h2>
            <TaskProgress percentage={completionPercentage} />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Tasks</h2>
            <TaskList />
          </div>
        </div>
      </div>

      {/* Task Modal */}
      <TaskModal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
