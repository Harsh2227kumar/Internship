export type User = {
  id: string;
  username: string;
  role: 'admin' | 'teacher' | 'staff';
  name: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  category: string;
  assigneeId: string;
  createdBy: string;
  recurring?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    endDate?: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type Notification = {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'task_assigned' | 'deadline_approaching' | 'status_update';
  read: boolean;
  createdAt: string;
};