import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { X } from 'lucide-react';
import { useTask } from '../context/TaskContext';

const TaskSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
  status: Yup.string().oneOf(['todo', 'inProgress', 'done']).required('Status is required'),
  priority: Yup.string().oneOf(['low', 'medium', 'high']).required('Priority is required'),
  dueDate: Yup.date().nullable()
});

function TaskForm({ task, onClose }) {
  const { createTask, updateTask } = useTask();
  
  const initialValues = task ? {
    title: task.title,
    description: task.description || '',
    status: task.status,
    priority: task.priority || 'medium',
    dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
    assignedTo: task.assignedTo?._id || ''
  } : {
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
    assignedTo: ''
  };
  
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (task) {
        await updateTask(task._id, values);
      } else {
        await createTask(values);
      }
      onClose();
    } catch (error) {
      console.error('Error submitting task:', error);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{task ? 'Edit Task' : 'Create New Task'}</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <Formik
          initialValues={initialValues}
          validationSchema={TaskSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <Field
                  type="text"
                  name="title"
                  id="title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Task title"
                />
                <ErrorMessage name="title" component="div" className="mt-1 text-sm text-red-600" />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  id="description"
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Task description"
                />
              </div>
              
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <Field
                  as="select"
                  name="status"
                  id="status"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="todo">To Do</option>
                  <option value="inProgress">In Progress</option>
                  <option value="done">Done</option>
                </Field>
              </div>
              
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <Field
                  as="select"
                  name="priority"
                  id="priority"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Field>
              </div>
              
              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <Field
                  type="date"
                  name="dueDate"
                  id="dueDate"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default TaskForm;