import React, { useState } from 'react';
import { Plus, Search, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import TaskModal from '../components/TaskModal';
import { Task } from '../types';

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Review Midterm Papers',
    description: 'Grade midterm examination papers for CS101',
    priority: 'high',
    status: 'pending',
    dueDate: '2024-03-25T14:00:00',
    category: 'Academics',
    assigneeId: '2',
    createdBy: '1',
    createdAt: '2024-03-20T10:00:00',
    updatedAt: '2024-03-20T10:00:00'
  },
  {
    id: '2',
    title: 'Department Meeting',
    description: 'Weekly department sync-up',
    priority: 'medium',
    status: 'completed',
    dueDate: '2024-03-22T11:00:00',
    category: 'Meetings',
    assigneeId: '2',
    createdBy: '1',
    recurring: {
      frequency: 'weekly'
    },
    createdAt: '2024-03-20T10:00:00',
    updatedAt: '2024-03-20T10:00:00'
  },
  {
    id: '3',
    title: 'Submit Course Plan',
    description: 'Prepare and submit next semester course plan',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2024-03-21T17:00:00',
    category: 'Planning',
    assigneeId: '2',
    createdBy: '1',
    createdAt: '2024-03-20T10:00:00',
    updatedAt: '2024-03-20T10:00:00'
  }
];

const priorityColors = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800'
};

const statusColors = {
  pending: 'bg-gray-100 text-gray-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800'
};

export default function Tasks() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [tasks] = useState<Task[]>(mockTasks);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const groupedTasks = {
    overdue: filteredTasks.filter(task => new Date(task.dueDate) < new Date() && task.status !== 'completed'),
    today: filteredTasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      const today = new Date();
      return taskDate.toDateString() === today.toDateString();
    }),
    upcoming: filteredTasks.filter(task => new Date(task.dueDate) > new Date())
  };

  const handleCreateTask = (taskData: any) => {
    console.log('Creating task:', taskData);
    setIsModalOpen(false);
  };

  const TaskGroup = ({ title, tasks, className }: { title: string; tasks: Task[]; className?: string }) => (
    <div className={`mb-8 ${className}`}>
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {tasks.map(task => (
          <div key={task.id} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{task.title}</h3>
              <div className="flex space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                  {task.priority}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
                  {task.status}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-2">{task.description}</p>
            <div className="flex items-center text-sm text-gray-500">
              <CalendarIcon className="w-4 h-4 mr-1" />
              {format(new Date(task.dueDate), 'MMM d, yyyy h:mm a')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Task
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <select
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="all">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>

        <select
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="space-y-6">
        {groupedTasks.overdue.length > 0 && (
          <TaskGroup title="Overdue" tasks={groupedTasks.overdue} className="bg-red-50 p-4 rounded-lg" />
        )}
        {groupedTasks.today.length > 0 && (
          <TaskGroup title="Today" tasks={groupedTasks.today} className="bg-blue-50 p-4 rounded-lg" />
        )}
        {groupedTasks.upcoming.length > 0 && (
          <TaskGroup title="Upcoming" tasks={groupedTasks.upcoming} className="bg-green-50 p-4 rounded-lg" />
        )}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTask}
      />
    </div>
  );
}