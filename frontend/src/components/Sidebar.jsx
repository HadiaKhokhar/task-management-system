import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Sidebar() {
  const { logout } = useAuth();
  
  return (
    <div className="w-64 bg-white shadow-md h-full flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-blue-600">Task Manager</h1>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => 
                `flex items-center p-2 rounded-md ${isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`
              }
            >
              <Home className="mr-2 h-5 w-5" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/profile" 
              className={({ isActive }) => 
                `flex items-center p-2 rounded-md ${isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`
              }
            >
              <User className="mr-2 h-5 w-5" />
              Profile
            </NavLink>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t">
        <button 
          onClick={logout}
          className="flex items-center p-2 w-full text-left rounded-md hover:bg-gray-100"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;