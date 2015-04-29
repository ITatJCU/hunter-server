var Util = require("util");
var LoggerStrategy = require("./logger-strategy");

/**
 * Formats a given message prepending a local time stamp
 *
 * @class DateTimeLoggerStrategy
 * @constructor
 * @extends LoggerStrategy
 */
function DateTimeLoggerStrategy() {
}
Util.inherits(DateTimeLoggerStrategy, LoggerStrategy);

DateTimeLoggerStrategy.prototype.format = function (value) {
    var date = new Date();
    var stamp = date.toISOString().slice(0, 10) + " " + date.toLocaleTimeString();
    return stamp + '\t' + value;
};


module.exports = DateTimeLoggerStrategy;