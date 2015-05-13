var CompositeRecorder = require('../lib/utilities/composite-recorder');
var FileStreamRecorder = require('../lib/utilities/file-stream-recorder');
var StrategyLogger = require('../lib/utilities/strategy-logger');
var ConsoleRecorder = require('../lib/utilities/console-recorder');
var DateTimeFormatStrategy = require('../lib/utilities/date-time-logger-strategy');
var LogEventDispatcher = require('../lib/utilities/log-event-dispatcher');

/**
 * Loggers configuration setup
 * @param {Restify} server Restify server instance
 */
module.exports = function (server) {

    //Initialise the General purpose Loggers and Recorders
    var cr = new CompositeRecorder();
    cr.add(new ConsoleRecorder());
    cr.add(new FileStreamRecorder('./logs/general.log'));
    var l = new StrategyLogger(cr);
    l.setStrategy(new DateTimeFormatStrategy());

    //Hook the Event Dispatcher
    LogEventDispatcher.getInstance().on('log', function (message) {
        l.log(message);
    });

    //Initialise the Request Loggers and Recorders
    var recorders = new CompositeRecorder();
    recorders.add(new ConsoleRecorder());
    recorders.add(new FileStreamRecorder('./logs/request.log'));
    var loggers = new StrategyLogger(recorders);
    loggers.setStrategy(new DateTimeFormatStrategy());

    //Restify request based logging middleware
    function logRequest(req, res, next) {
        var message = "Request \t" + req.connection.remoteAddress + "\t" + req.url;
        loggers.log(message + "\tData:" + JSON.stringify(req.body));
        next();
    }

    //Connect middleware
    server.use(logRequest);
};