/** @author Tyler Graham */

//Dependencies
var express  = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Application Imports
var taskApi  = require('./task/taskApi');

/**
 * Initializes application
 */
function init() {
  db_bootstrap();
  express_bootstrap();
}

/**
 * Sets up Express server
 */
function express_bootstrap() {
  var app = express();
  app.use(bodyParser());

  var server = app.listen('3000', function(){
    console.info('ALM online');
  });

  routes(app);
}

/**
 * Binds api endpoints
 */
function routes(app) {
  taskApi.routes(app);
}

/**
 * Sets up MongoDB
 */
function db_bootstrap() {
  mongoose.connect('mongodb://localhost/alm-db');
  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'alm db error: '));

  db.once('open', function() {
    console.log('database connected');
  });
}

init();
