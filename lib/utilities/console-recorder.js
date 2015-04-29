var Util = require("util");
var Recorder = require("./recorder");

/**
 * Records logger messages directly to the console
 *
 * @class ConsoleRecorder
 * @constructor
 * @extends Recorder
 */
function ConsoleRecorder() {
}

Util.inherits(ConsoleRecorder, Recorder);

/**
 * Writes specified message to the console
 *
 * @method record
 * @param {String} message Message to record
 */
ConsoleRecorder.prototype.record = function (message) {
    console.log(message);
};

module.exports = ConsoleRecorder;