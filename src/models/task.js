const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
});

taskSchema.statics.format = (task) => {
  return {
    description: task.description,
    completed: task.completed,
    owner: task.owner
  }
}

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;