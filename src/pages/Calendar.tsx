import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
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
  }
];

const priorityColors = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#10b981'
};

export default function Calendar() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const events = mockTasks.map(task => ({
    id: task.id,
    title: task.title,
    start: task.dueDate,
    backgroundColor: priorityColors[task.priority],
    extendedProps: task
  }));

  const handleEventClick = (info: any) => {
    setSelectedTask(info.event.extendedProps);
  };

  const handleDateSelect = (selectInfo: any) => {
    console.log('Selected date range:', selectInfo.startStr, selectInfo.endStr);
  };

  return (
    <div className="h-full space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          events={events}
          eventClick={handleEventClick}
          selectable={true}
          select={handleDateSelect}
          height="auto"
          aspectRatio={1.8}
        />
      </div>

      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold">{selectedTask.title}</h2>
                <p className="text-sm text-gray-500">Due: {new Date(selectedTask.dueDate).toLocaleString()}</p>
              </div>
              <button
                onClick={() => setSelectedTask(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">{selectedTask.description}</p>
              <div className="flex space-x-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  selectedTask.priority === 'high' ? 'bg-red-100 text-red-800' :
                  selectedTask.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {selectedTask.priority} priority
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  selectedTask.status === 'completed' ? 'bg-green-100 text-green-800' :
                  selectedTask.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {selectedTask.status}
                </span>
              </div>
              {selectedTask.recurring && (
                <p className="text-sm text-gray-500">
                  Recurring: {selectedTask.recurring.frequency}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}