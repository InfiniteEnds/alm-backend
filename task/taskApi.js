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

/**
 * Get Task by Id
 */
var getById = function(req, res) {
  taskSchema.Task.findOne({ _id: req.params.id }, function(err, tasks) {
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
  //Retrieve task by id
  api.get('/task/:id', getById);

  //Add task
  api.post('/task', add);
}
