import React, { useState } from 'react';
import { MoreVertical, Edit, Trash, ArrowRight } from 'lucide-react';
import { useTask } from '../context/TaskContext';
import TaskForm from './TaskForm';

function TaskCard({ task }) {
  const { moveTask, deleteTask } = useTask();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  
  const handleMoveTask = (newStatus) => {
    moveTask(task._id, newStatus);
    setShowDropdown(false);
  };
  
  const handleDeleteTask = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task._id);
    }
    setShowDropdown(false);
  };
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  
  if (showEditForm) {
    return <TaskForm task={task} onClose={() => setShowEditForm(false)} />;
  }
  
  return (
    <div className="bg-white rounded-md shadow-sm p-4 mb-3 border-l-4 border-blue-500">
      <div className="flex justify-between items-start">
        <h4 className="font-medium text-gray-800">{task.title}</h4>
        
        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <MoreVertical className="h-4 w-4 text-gray-500" />
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border">
              {task.status !== 'inProgress' && (
                <button
                  onClick={() => handleMoveTask('inProgress')}
                  className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Move to In Progress
                </button>
              )}
              
              {task.status !== 'done' && (
                <button
                  onClick={() => handleMoveTask('done')}
                  className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Move to Done
                </button>
              )}
              
              {task.status !== 'todo' && (
                <button
                  onClick={() => handleMoveTask('todo')}
                  className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Move to To Do
                </button>
              )}
              
              <button
                onClick={() => {
                  setShowEditForm(true);
                  setShowDropdown(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Task
              </button>
              
              <button
                onClick={handleDeleteTask}
                className="flex items-center w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete Task
              </button>
            </div>
          )}
        </div>
      </div>
      
      {task.description && (
        <p className="text-sm text-gray-600 mt-2">{task.description}</p>
      )}
      
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center">
          {task.assignedTo ? (
            <div className="flex items-center">
              {task.assignedTo.profilePicture ? (
                <img 
                  src={task.assignedTo.profilePicture || "/placeholder.svg"} 
                  alt={task.assignedTo.name} 
                  className="h-6 w-6 rounded-full object-cover"
                />
              ) : (
                <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                  {task.assignedTo.name.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="text-xs text-gray-500 ml-2">{task.assignedTo.name}</span>
            </div>
          ) : (
            <span className="text-xs text-gray-500">Unassigned</span>
          )}
        </div>
        
        {task.priority && (
          <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
        )}
      </div>
      
      {task.dueDate && (
        <div className="mt-2 text-xs text-gray-500">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}
    </div>
  );
}

export default TaskCard;