import React, { useEffect, useState } from 'react';
import { Bell, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Notification } from '../types';

const notificationIcons = {
  task_assigned: Bell,
  deadline_approaching: Clock,
  status_update: CheckCircle2
};

const loadNotifications = (): Notification[] => {
  return JSON.parse(localStorage.getItem('notifications') || '[]');
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(loadNotifications());
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications(loadNotifications());
    }, 2000); // Auto-refresh every 2 seconds to detect new notifications

    return () => clearInterval(interval);
  }, []);

  const filteredNotifications = notifications.filter(notification =>
    filter === 'all' || (filter === 'unread' && !notification.read)
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (notificationId: string) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === notificationId ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          {unreadCount > 0 && (
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {unreadCount} unread
            </span>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <select
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'unread')}
          >
            <option value="all">All Notifications</option>
            <option value="unread">Unread Only</option>
          </select>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Mark all as read
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
        {filteredNotifications.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2">No notifications found</p>
          </div>
        ) : (
          filteredNotifications.map(notification => {
            const Icon = notificationIcons[notification.type];
            return (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 transition-colors ${
                  !notification.read ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-full ${
                    notification.type === 'task_assigned' ? 'bg-purple-100 text-purple-600' :
                    notification.type === 'deadline_approaching' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      <span className="text-xs text-gray-500">
                        {formatDate(notification.createdAt)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {notification.message}
                    </p>
                  </div>
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-sm text-indigo-600 hover:text-indigo-500"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
