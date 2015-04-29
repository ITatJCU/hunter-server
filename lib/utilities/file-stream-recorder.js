var Util = require("util");
var Recorder = require("./recorder");
var FS = require("fs");

/**
 * File Stream Recorder
 *
 * Records any logged messages to a specified file
 *
 * @class FileStreamRecorder
 * @param {string} destinationFile Log file destination.
 *                 Note: Folders will not be created automatically, paths may be relative.
 * @constructor
 * @extends Recorder
 */
function FileStreamRecorder(destinationFile) {
    this._stream = null;
    this._destination = "";
    this.setDestination(destinationFile);
}
Util.inherits(FileStreamRecorder, Recorder);

/**
 * Creates an appendable write stream for recording messages.
 *
 * @method setStream
 */
FileStreamRecorder.prototype.setStream = function () {
    this._stream = FS.createWriteStream(this._destination, { 'flags': 'a', 'encoding': 'utf8', 'mode': 0666 });
};

/**
 * Sets the output destination file for messages.
 *
 * @method setDestination
 * @param {string} destination recorder file path.
 */
FileStreamRecorder.prototype.setDestination = function (destination) {
    if (typeof destination !== 'string') {
        return;
    }
    this._destination = destination;

    if (this._stream != null) {
        FS.close(this._stream);
    }
    this.setStream();
};

/**
 * Gets the current file stream destination
 *
 * @method getDestination
 * @returns {string} Stream output file
 */
FileStreamRecorder.prototype.getDestination = function () {
    return this._destination;
};

/**
 * Gets the current file stream reference
 *
 * @method getStream
 * @returns {null|WriteStream} Current WriteStream object or null if none initialised
 */
FileStreamRecorder.prototype.getStream = function () {
    return this._stream;
};

/**
 * Records a specified message to the output stream
 *
 * @method record
 * @param {string} message Message to record
 */
FileStreamRecorder.prototype.record = function (message) {
    if (this._stream != null) {
        this._stream.write(message + '\n');
    } else {
        throw new Error("Stream Not Set");
    }
};

module.exports = FileStreamRecorder;