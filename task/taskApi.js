/** @author Tyler Graham */

var Task = require('./taskSchema').Task;

/**
 * Creates a new Task
 */
exports.add = function(req, res) {
  task = new Task(req.body);
  task.save(function(err) {
    if(err) {
      res.send(err);
    }
    else {
      res.send(task);
    }
  });
};

/**
 * Get Task by Id
 */
exports.getById = function(req, res) {
  Task.findById(req.params.id, function(err, tasks) {
    if(err) {
      console.log(err);
    }
    else {
      res.send(tasks);
    }
  });
};

/**
 * Defines Rest endpoints
 */
exports.routes = function(api) {
  //Retrieve task by id
  api.get('/task/:id', exports.getById);

  //Add task
  api.post('/task', exports.add);
};
