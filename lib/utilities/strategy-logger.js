var Util = require("util");
var Logger = require("./logger");
var LoggerStrategy = require("./logger-strategy");
var Objects = require('./objects');

/**
 * Strategy formatted variation of the Logger class
 *
 * @class StrategyLogger
 * @extends Logger
 *
 * @param {Recorder} recorder
 * @param {LoggerStrategy} strategy
 * @constructor
 */
function StrategyLogger(recorder, strategy) {
    StrategyLogger.super_.call(this, recorder);
    this.setStrategy(strategy);
}
Util.inherits(StrategyLogger, Logger);

/**
 * Sets the strategy formatting implementation
 *
 * @method setStrategy
 * @param {LoggerStrategy} strategy Formatting strategy implementation
 * @default LoggerStrategy
 */
StrategyLogger.prototype.setStrategy = function (strategy) {
    if (!Objects.IsPrototypeOf(strategy, LoggerStrategy)) {
        strategy = new LoggerStrategy();
    }
    this._strategy = strategy;
};

/**
 * Gets the strategy formatting implementation
 *
 * @method strategy
 * @returns {LoggerStrategy} Logger formatting strategy
 */
StrategyLogger.prototype.strategy = function () {
    return this._strategy;
};

/**
 * Formats and logs the message to the specified recorder
 *
 * @method log
 * @param {String} message to log
 */
StrategyLogger.prototype.log = function (message) {
    StrategyLogger.super_.prototype.log.call(this, this._strategy.format(message));
};

module.exports = StrategyLogger;