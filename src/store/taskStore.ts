import { create } from 'zustand';
import type { Task, Notification } from '../types';

type TaskStore = {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  filterTasks: (filter: { status?: string }) => Task[]; // ✅ Add this
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),

  addTask: (taskData) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => {
      const updatedTasks = [...state.tasks, newTask];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    });

    const newNotification: Notification = {
      id: crypto.randomUUID(),
      userId: newTask.assigneeId,
      title: 'New Task Assigned',
      message: `You have been assigned a new task: "${newTask.title}"`,
      type: 'task_assigned',
      read: false,
      createdAt: new Date().toISOString(),
    };

    const storedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const updatedNotifications = [...storedNotifications, newNotification];
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  },

  updateTask: (id, updates) => {
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    });
  },

  deleteTask: (id) => {
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== id);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    });
  },

  // ✅ Add filterTasks function
  filterTasks: (filter) => {
    const { tasks } = get();
    return tasks.filter((task) => (filter.status ? task.status === filter.status : true));
  },
}));
