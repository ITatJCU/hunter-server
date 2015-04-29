var restify = require('restify');
var fs = require('fs');
var LogEventDispatcher = require('./lib/utilities/log-event-dispatcher');


var mongoose = require('mongoose');
//ToDo: Remove hardcoded URL
mongoose.connect(
  process.env['MONGO_URL'] || 'mongodb://10.8.164.68/hunter'
);

var db = mongoose.connection;
db.on('error', function(err){
    LogEventDispatcher.log('Database error:' + err);
});

db.once('open', function (callback) {
    LogEventDispatcher.log('Database connected successfully');
});

var server = restify.createServer();
server.io = require('./config/socketio')(server);

//Configure Server
server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.dateParser());
server.use(restify.queryParser());
server.use(restify.jsonp());
server.use(restify.gzipResponse());
server.use(restify.bodyParser({mapParams: true}));

//Initialise the loggers
require('./config/loggers')(server);

/**
 * Loading Models
 * @type {string[]}
 */
var schemas = [];
['Code', 'Player', 'Event'].forEach(function (model) {
    schemas[model] = require('./schemas/' + model)(mongoose);
});

/**
 * Load routes from a sub directory recursively
 */
function initialiseRoutes() {
    LogEventDispatcher.log('Loading routes...');
    var routes = __dirname + '/routes';

    fs.readdirSync(routes).forEach(function (file) {
        LogEventDispatcher.log('\t' + file);
        require(routes + '/' + file)(server, schemas);
    });
}


//Start the server
server.listen(8080, function () {
    initialiseRoutes();
    LogEventDispatcher.log(server.name + ' listening at ' + server.url);
});
