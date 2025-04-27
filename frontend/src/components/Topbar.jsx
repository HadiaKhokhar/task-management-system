import React from 'react';
import { useAuth } from '../context/AuthContext';

function Topbar() {
  const { user } = useAuth();
  
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Welcome, {user?.name}</h1>
      
      <div className="flex items-center">
        <div className="flex items-center space-x-3">
          {user?.profilePicture ? (
            <img 
              src={user.profilePicture || "/placeholder.svg"} 
              alt={user.name} 
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              {user?.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;