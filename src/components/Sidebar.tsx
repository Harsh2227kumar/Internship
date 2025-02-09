import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  ListTodo, 
  BarChart2, 
  Bell, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const navigation = [
  { name: 'Dashboard', to: '/', icon: LayoutDashboard },
  { name: 'Tasks', to: '/tasks', icon: ListTodo },
  { name: 'Calendar', to: '/calendar', icon: Calendar },
  { name: 'Analytics', to: '/analytics', icon: BarChart2 },
  { name: 'Notifications', to: '/notifications', icon: Bell },
  { name: 'Settings', to: '/settings', icon: Settings },
];

export default function Sidebar() {
  const { user, logout } = useAuthStore();

  return (
    <div className="flex flex-col w-64 bg-white border-r">
      <div className="flex items-center justify-center h-16 border-b">
        <h1 className="text-xl font-bold text-gray-800">TaskEase</h1>
      </div>

      <div className="flex flex-col justify-between flex-1 p-4">
        <nav className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto">
          <div className="flex items-center px-4 py-3 bg-gray-50 rounded-lg">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-2 mt-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}