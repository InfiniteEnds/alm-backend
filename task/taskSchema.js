/** @author Tyler Graham */

var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
  hours: { type: Number, required: true, min: 0 },
  users: [String],
  workItemId: { type: String, required: true }
});

var Task = mongoose.model('Task', taskSchema);

exports.Task = Task;
