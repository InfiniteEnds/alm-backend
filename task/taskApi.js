/** @author Tyler Graham */

var taskSchema = require('./taskSchema');

/**
 * Creates a new Task
 */
var add = function(req, res) {

  task = new taskSchema.Task(req.body);
  task.save(function(err) {
    if(err) {
      console.log(err);
      res.send(err);
    }
    else {
      res.send(task);
    }
  });

};

var getAll = function(req, res) {
  taskSchema.Task.find('', function(err, tasks) {
    if(err) {
      console.log(err);
    }
    else {
      res.send(tasks);
    }
  });
}

/**
 * Defines Rest endpoints
 */
exports.routes = function(api) {
  //Retrieve tasks
  api.get('/task', getAll);

  //Add task
  api.post('/task', add);
}
