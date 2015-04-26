var restify = require('restify');
var fs = require('fs');

var mongoose = require('mongoose');
//ToDo: Remove hardcoded URL
mongoose.connect('mongodb://10.8.164.68/hunter');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection error:'));

db.once('open', function (callback) {
    console.log('Database connected successfully');
});

var server = restify.createServer();
server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.dateParser());
server.use(restify.queryParser());
server.use(restify.jsonp());
server.use(restify.gzipResponse());
server.use(restify.bodyParser({mapParams: true}));

/**
 * Loading Models
 * @type {string[]}
 */
var schemas = [];
['Player', 'Event'].forEach(function (model) {
    schemas[model] = require('./schemas/' + model)(mongoose);
});

/**
 * Load routes from a sub directory recursively
 */
function initialiseRoutes() {
    console.log('Loading routes...');
    var routes = __dirname + '/routes';

    fs.readdirSync(routes).forEach(function (file) {
        console.log('\t' + file);
        require(routes + '/' + file)(server, schemas);
    });
}


//Start the server
server.listen(8080, function () {
    initialiseRoutes();
    console.log('%s listening at %s', server.name, server.url);
});