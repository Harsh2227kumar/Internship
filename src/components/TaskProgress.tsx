import React from 'react';

interface TaskProgressProps {
  percentage: number;
}

const TaskProgress: React.FC<TaskProgressProps> = ({ percentage }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Overall Progress</span>
        <span className="text-sm font-medium text-indigo-600">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-indigo-600 h-2.5 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Completed Tasks</p>
          <p className="text-2xl font-semibold text-indigo-600">24</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Pending Tasks</p>
          <p className="text-2xl font-semibold text-orange-600">12</p>
        </div>
      </div>
    </div>
  );
};

export default TaskProgress;
