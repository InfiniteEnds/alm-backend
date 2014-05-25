/** @author Tyler Graham */

var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
  hours: Number,
  users: [String],
  workItemId: String
});

var Task = mongoose.model('Task', taskSchema);

exports.Task = Task;
