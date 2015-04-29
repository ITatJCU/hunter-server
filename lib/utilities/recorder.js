/**
 * Abstract Recorder Class
 *
 * @class Recorder
 * @constructor
 */
function Recorder() {
}

/**
 * Handle storing a specified message with the implemented medium
 *
 * @method record
 * @param {String} message Message to record
 */
Recorder.prototype.record = function (message) {
    throw new Error("Method Not Implemented");
};

module.exports = Recorder;