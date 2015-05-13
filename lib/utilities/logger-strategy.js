/**
 * Abstract LoggerStrategy used to provide additional log message formatting prior to being passed to a recorder for
 * storage
 *
 * @class LoggerStrategy
 * @constructor
 */
function LoggerStrategy() {
}

/**
 * Formats a specified string as required.
 *
 * @method format
 * @param {String} message
 * @returns {String} Formatted Message
 */
LoggerStrategy.prototype.format = function (message) {
    return message;
};

module.exports = LoggerStrategy;