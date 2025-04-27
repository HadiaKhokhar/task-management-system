import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Plus } from 'lucide-react';
import { useTask } from '../context/TaskContext';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';

function DroppableColumn({ id, children }) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div ref={setNodeRef} className="flex-1 overflow-y-auto">
      {children}
    </div>
  );
}

function DraggableTask({ task }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} />
    </div>
  );
}

function TaskBoard() {
  const { tasks, moveTask, loading } = useTask();
  const [showTaskForm, setShowTaskForm] = useState(false);

  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'inProgress');
  const doneTasks = tasks.filter(task => task.status === 'done');

  const handleDragEnd = (event) => {
    const { active, over } = event;
  
    if (!over || active.id === over.id) {
      return;
    }
  
    const destinationColumn = over.id;
  
    if (['todo', 'inProgress', 'done'].includes(destinationColumn)) {
      // Move task to another column
      moveTask(active.id, destinationColumn);
    } else {
      // Dropped inside the same column (or reordering tasks)
      // You can implement reordering here later if you want
    }
  };
  

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Task Board</h2>
        <button
          onClick={() => setShowTaskForm(true)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <Plus className="mr-1 h-5 w-5" />
          Add Task
        </button>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100%-4rem)]">
          {/* To Do Column */}
          <div className="bg-gray-50 rounded-lg shadow p-4 flex flex-col h-full">
            <h3 className="font-semibold text-lg mb-4 text-gray-700 flex items-center">
              To Do
              <span className="ml-2 bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                {todoTasks.length}
              </span>
            </h3>

            <DroppableColumn id="todo">
              <SortableContext items={todoTasks.map(task => task._id)} strategy={verticalListSortingStrategy}>
                {todoTasks.map(task => (
                  <DraggableTask key={task._id} task={task} />
                ))}
              </SortableContext>
            </DroppableColumn>
          </div>

          {/* In Progress Column */}
          <div className="bg-gray-50 rounded-lg shadow p-4 flex flex-col h-full">
            <h3 className="font-semibold text-lg mb-4 text-gray-700 flex items-center">
              In Progress
              <span className="ml-2 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                {inProgressTasks.length}
              </span>
            </h3>

            <DroppableColumn id="inProgress">
              <SortableContext items={inProgressTasks.map(task => task._id)} strategy={verticalListSortingStrategy}>
                {inProgressTasks.map(task => (
                  <DraggableTask key={task._id} task={task} />
                ))}
              </SortableContext>
            </DroppableColumn>
          </div>

          {/* Done Column */}
          <div className="bg-gray-50 rounded-lg shadow p-4 flex flex-col h-full">
            <h3 className="font-semibold text-lg mb-4 text-gray-700 flex items-center">
              Done
              <span className="ml-2 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
                {doneTasks.length}
              </span>
            </h3>

            <DroppableColumn id="done">
              <SortableContext items={doneTasks.map(task => task._id)} strategy={verticalListSortingStrategy}>
                {doneTasks.map(task => (
                  <DraggableTask key={task._id} task={task} />
                ))}
              </SortableContext>
            </DroppableColumn>
          </div>
        </div>
      </DndContext>

      {showTaskForm && (
        <TaskForm onClose={() => setShowTaskForm(false)} />
      )}
    </div>
  );
}

export default TaskBoard;
