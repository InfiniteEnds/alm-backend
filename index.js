/** @author Tyler Graham */

var args = require('minimist')(process.argv.slice(2));

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

  var port    = parseInt(process.env.OPENSHIFT_NODEJS_PORT) || args.p || args.port || 3000;
  var ip_addr = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

  console.log('port', port, ip_addr);

  var server = app.listen(port, ip_addr, function() {
    console.info('ALM online\nListening on port %s:%d', server.address().address, server.address().port);
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
  var db_loc = 'mongodb://localhost/';

  if(process.env.OPENSHIFT_MONGODB_DB_HOST) {
    db_loc = 'mongodb://' + process.env.OPENSHIFT_MONGODB_DB_HOST;
    db_loc += ':' + process.env.OPENSHIFT_MONGODB_DB_PORT + '/';
  }

  mongoose.connect(db_loc + 'alm-db');
  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'alm db error: '));

  db.once('open', function() {
    console.log('database connected');
  });
}

init();
