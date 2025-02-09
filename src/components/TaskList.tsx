import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

const TaskList: React.FC = () => {
  const tasks = [
    {
      id: 1,
      title: 'Review Semester Plan',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-03-20',
    },
    {
      id: 2,
      title: 'Grade Mid-term Papers',
      priority: 'medium',
      status: 'in-progress',
      dueDate: '2024-03-18',
    },
    {
      id: 3,
      title: 'Department Meeting',
      priority: 'low',
      status: 'completed',
      dueDate: '2024-03-15',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div className="flex items-center space-x-4">
            {getStatusIcon(task.status)}
            <div>
              <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
              <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
            </div>
          </div>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
              task.priority
            )}`}
          >
            {task.priority}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TaskList;