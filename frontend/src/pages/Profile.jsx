import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTask } from '../context/TaskContext';

function Profile() {
  const { user } = useAuth();
  const { tasks } = useTask();
  const [activeTab, setActiveTab] = useState('assigned');
  
  // Filter tasks assigned to the current user
  const assignedTasks = tasks.filter(task => 
    task.assignedTo && task.assignedTo._id === user._id
  );
  
  // Filter tasks created by the current user
  const createdTasks = tasks.filter(task => 
    task.createdBy && task.createdBy._id === user._id
  );
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center">
          {user?.profilePicture ? (
            <img 
              src={user.profilePicture || "/placeholder.svg"} 
              alt={user.name} 
              className="h-20 w-20 rounded-full object-cover mr-6"
            />
          ) : (
            <div className="h-20 w-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl mr-6">
              {user?.name.charAt(0).toUpperCase()}
            </div>
          )}
          
          <div>
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-sm text-gray-500 mt-1">
              Role: {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="border-b">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('assigned')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'assigned'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Assigned Tasks ({assignedTasks.length})
            </button>
            <button
              onClick={() => setActiveTab('created')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'created'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Created Tasks ({createdTasks.length})
            </button>
          </nav>
        </div>
        
        <div className="p-4">
          {activeTab === 'assigned' ? (
            assignedTasks.length > 0 ? (
              <div className="space-y-3">
                {assignedTasks.map(task => (
                  <div key={task._id} className="p-3 border rounded-md">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{task.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        task.status === 'todo' ? 'bg-gray-100 text-gray-700' :
                        task.status === 'inProgress' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {task.status === 'todo' ? 'To Do' :
                         task.status === 'inProgress' ? 'In Progress' : 'Done'}
                      </span>
                    </div>
                    {task.description && (
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    )}
                    <div className="mt-2 text-xs text-gray-500">
                      Created by: {task.createdBy?.name || 'Unknown'}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No tasks assigned to you yet.</p>
            )
          ) : (
            createdTasks.length > 0 ? (
              <div className="space-y-3">
                {createdTasks.map(task => (
                  <div key={task._id} className="p-3 border rounded-md">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{task.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        task.status === 'todo' ? 'bg-gray-100 text-gray-700' :
                        task.status === 'inProgress' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {task.status === 'todo' ? 'To Do' :
                         task.status === 'inProgress' ? 'In Progress' : 'Done'}
                      </span>
                    </div>
                    {task.description && (
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    )}
                    <div className="mt-2 text-xs text-gray-500">
                      Assigned to: {task.assignedTo?.name || 'Unassigned'}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">You haven't created any tasks yet.</p>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;