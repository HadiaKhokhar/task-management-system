import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  status: {
    type: String,
    enum: {
      values: ['todo', 'inProgress', 'done'],
      message: '{VALUE} is not a valid status'
    },
    default: 'todo'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // Making this optional
    required: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Creator is required']
  },
  dueDate: {
    type: Date,
    required: false
  },
  priority: {
    type: String,
    enum: {
      values: ['low', 'medium', 'high'],
      message: '{VALUE} is not a valid priority'
    },
    default: 'medium'
  }
}, { timestamps: true });

// Add a pre-save hook to validate dates
taskSchema.pre('save', function(next) {
  // If dueDate is provided but invalid, set it to null
  if (this.dueDate && isNaN(new Date(this.dueDate).getTime())) {
    this.dueDate = null;
  }
  next();
});

const Task = mongoose.model('Task', taskSchema);

export default Task;