var restify = require('restify');
var fs = require('fs');

var server = restify.createServer();

/**
 * Load routes from a sub directory recursively
 */
function initialiseRoutes() {
    console.log('Loading routes...');
    var routes = __dirname + '/routes';

    fs.readdirSync(routes).forEach(function (file) {
        console.log('\t' + file);
        require(routes + '/' + file)(server);
    });
}


//Start the server
server.listen(8080, function () {
    initialiseRoutes();
    console.log('%s listening at %s', server.name, server.url);
});