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
  var options;

  if(process.env.OPENSHIFT_MONGODB_DB_HOST) {
    db_loc = 'mongodb://' + process.env.OPENSHIFT_MONGODB_DB_HOST;
    db_loc += ':' + process.env.OPENSHIFT_MONGODB_DB_PORT + '/';

    options = {
      user: process.env.OPENSHIFT_MONGODB_DB_USERNAME,
      pass: process.env.OPENSHIFT_MONGODB_DB_PASSWORD,
      auth: {
        authSource: 'admin'
      }
    };
  }

  mongoose.connect(db_loc + 'alm-db', options || {});
  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'database error: '));

  db.once('open', function() {
    console.log('connected to database');
  });
}

init();
