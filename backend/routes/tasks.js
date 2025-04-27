import express from 'express';
import { auth } from '../middleware/auth.js'; // Import with .js extension
import Task from '../models/Task.js';  // Import with .js extension

const router = express.Router();

// Update the create task route with better error logging
router.post('/', auth, async (req, res) => {
  try {
    console.log('Creating task with data:', req.body);
    console.log('User making request:', req.user);
    
    const { title, description, status, assignedTo, dueDate, priority } = req.body;
    
    // Create new task
    const task = new Task({
      title,
      description,
      status: status || 'todo',
      assignedTo,
      createdBy: req.user._id,
      dueDate,
      priority: priority || 'medium'
    });
    
    console.log('Task object before save:', task);
    
    await task.save();
    
    const populatedTask = await Task.findById(task._id)
      .populate('assignedTo', 'name email profilePicture')
      .populate('createdBy', 'name email');
    
    console.log('Task created successfully:', populatedTask);
    
    res.status(201).json(populatedTask);
  } catch (error) {
    console.error('Error creating task:', error);
    console.error('Error stack:', error.stack);
    
    // Send a more detailed error response
    res.status(500).json({ 
      message: 'Failed to create task', 
      error: error.message,
      details: error.errors ? Object.keys(error.errors).map(key => ({
        field: key,
        message: error.errors[key].message
      })) : null
    });
  }
});

export default router;
