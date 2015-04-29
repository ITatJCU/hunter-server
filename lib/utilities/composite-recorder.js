var Util = require("util");
var Recorder = require("./recorder");
var Objects = require("./objects");

/**
 * Composite Recorder
 *
 * Allows group based logging to multiple {Recorder} objects
 *
 * @class CompositeRecorder
 * @constructor
 * @extends Recorder
 */
function CompositeRecorder() {
    this.clear();
}

Util.inherits(CompositeRecorder, Recorder);

/**
 * Clears or removes all associated {Recorder}s
 * @method clear
 */
CompositeRecorder.prototype.clear = function () {
    this._recorders = [];
};

 /**
 * Gets the total number of associated {Recorder}s
 * @method size;
 * @returns {number}
 */
CompositeRecorder.prototype.size = function () {
    return this._recorders.length;
};

/**
 * Records the specified message with each associated {Recorder}
 *
 * @method record
 * @param {String} message Message to record
 */
CompositeRecorder.prototype.record = function (message) {
    for (var i = 0; i < this._recorders.length; i++) {
        this._recorders[i].record(message);
    }
};

/**
 * Adds a {Recorder} to the group
 *
 * @method add
 * @param {Recorder} recorder to add.
 */
CompositeRecorder.prototype.add = function (recorder) {
    if (!Objects.IsPrototypeOf(recorder, Recorder)) {
        return;
    }
    this._recorders.push(recorder);
};


/**
 * Removes a {Recorder} from the group
 *
 * @method remove
 * @param {Recorder} recorder instance to remove
 */
CompositeRecorder.prototype.remove = function (recorder) {
    if (!Objects.IsPrototypeOf(recorder, Recorder)) {
        return;
    }
    var index = this._recorders.indexOf(recorder);
    if (index) {
        this._recorders.splice(index, 1);
    }
};

module.exports = CompositeRecorder;