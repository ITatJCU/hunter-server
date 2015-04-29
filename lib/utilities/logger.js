var Recorder = require('./recorder');
var Objects = require('./objects');

/**
 * Generic Logger Class
 *
 * @class Logger
 * @param recorder
 * @constructor
 */
function Logger(recorder) {
    this._recorder = null;
    this.setRecorder(recorder);
}

/**
 * Gets the utilised recorder
 *
 * @method getRecorder
 * @returns {Recorder|null}
 */
Logger.prototype.getRecorder = function () {
    return this._recorder;
};


/**
 * Sets a Recorder to the logger
 *
 * @method setRecorder
 * @param {Recorder} recorder
 */
Logger.prototype.setRecorder = function (recorder) {
    if (Objects.IsPrototypeOf(recorder,Recorder)) {
        this._recorder = recorder;
    }
};

/**
 * Core logging function.  Logs a specified message to the recorder
 *
 * @method log
 * @param {String} message Message to log.
 */
Logger.prototype.log = function (message) {
    if (this._recorder != null) {
        this._recorder.record(message);
    }
};

module.exports = Logger;