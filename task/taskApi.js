/** @author Tyler Graham */

var Task = require('./taskSchema').Task;

/**
 * Creates a new Task
 */
var add = function(req, res) {
  task = new Task(req.body);
  task.save(function(err) {
    res.send(err ? err : task);
  });
};

/**
 * Get Task by Id
 */
var getById = function(req, res) {
  Task.findById(req.params.id, function(err, tasks) {
    res.send(err ? err : tasks);
  });
};

/**
 * Validate Task
 *
 * @method validate
 * @param {Object} - object with data used task data in it (e.g req.body)
 * @param {Function} - optional callback that contains the error if validation fails
 *   or the Task if it succeeded
 */
exports.validate = function(obj, callback) {
  task = new Task(obj);
  task.validate(function(err) {
    if(callback) {
      callback(err ? err : task);
    }
    return err ? err : task;
  });
};

/**
 * Defines Rest endpoints
 * @param Express app
 */
exports.routes = function(api) {
  api.get('/task/:id', getById);
  api.post('/task', add);
};
