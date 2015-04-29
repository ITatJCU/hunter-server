var FileStreamRecorder = require('../../lib/utilities/file-stream-recorder');
var recorder = new FileStreamRecorder();

exports['testConstructor'] = function (test) {
    test.strictEqual(recorder.getStream(), null);
    test.strictEqual(recorder.getDestination(), "");
    test.done();
};

exports['testParamConstructor'] = function (test) {
    var FSR = new FileStreamRecorder("./logs/testLog.log");
    test.strictEqual(FSR.getDestination(), "./logs/testLog.log");
    test.notEqual(FSR.getStream(), null);
    test.done();
};

exports['testSetDestination'] = function (test) {
    recorder.setDestination('./logs/testLog.log');
    test.strictEqual(recorder.getDestination(), './logs/testLog.log');
    test.done();
};

exports['testErrorRecording'] = function (test) {
    test.throws(function () {
        var FSR = new FileStreamRecorder();
        FSR.record("Testing File Stream Recorder");
    });
    test.done();
};

exports['testRecord'] = function (test) {
    test.doesNotThrow(function () {
        recorder.record("Testing File Stream Recorder");
    });
    test.done();
};