var taskSchema = require('./taskSchema');

exports.createTask = function(req, res) {
  newTask = new taskSchema.Task(req.body);

  newTask.save(function(err) {

    if(err) {
      console.log(err);
      res.send(err);
    }
    else {
      res.send(newTask);
    }

  });
};
