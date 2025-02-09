import React from 'react';
import { Dialog } from '@headlessui/react';
import { format } from 'date-fns';
import { Clock, Calendar as CalendarIcon } from 'lucide-react';
import type { Task } from '../types';
import { useTaskStore } from '../store/taskStore';

type TaskDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  tasks: Task[];
};

export default function TaskDetailsModal({
  isOpen,
  onClose,
  date,
  tasks,
}: TaskDetailsModalProps) {
  const { updateTask } = useTaskStore();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-red-100 text-red-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    updateTask(taskId, { status: newStatus });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6">
          <Dialog.Title className="text-lg font-medium mb-4 flex items-center">
            <CalendarIcon className="w-5 h-5 mr-2" />
            Tasks for {format(date, 'MMMM d, yyyy')}
          </Dialog.Title>

          <div className="space-y-4">
            {tasks.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No tasks scheduled for this day
              </p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="border rounded-lg p-4 space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{task.title}</h3>
                    <select
                      value={task.status}
                      onChange={(e) =>
                        handleStatusChange(
                          task.id,
                          e.target.value as Task['status']
                        )
                      }
                      className={`text-sm rounded-full px-2 py-1 ${getStatusColor(
                        task.status
                      )}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <p className="text-sm text-gray-600">{task.description}</p>

                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    Due: {format(new Date(task.dueDate), 'h:mm a')}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span
                      className={`px-2 py-1 rounded-full ${
                        task.priority === 'high'
                          ? 'bg-red-100 text-red-800'
                          : task.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {task.priority} priority
                    </span>
                    <span className="text-gray-500">{task.category}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}