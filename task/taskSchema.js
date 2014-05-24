var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
  hours: Number,
  users: [String],
  storyId: String
});

var Task = mongoose.model('Task', taskSchema);

exports.Task = Task;
