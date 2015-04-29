var ConsoleRecorder = require('../../lib/utilities/console-recorder');
var recorder = new ConsoleRecorder();

exports['testConstructor'] = function (test) {
    test.done();
};

exports['testRecord'] = function (test) {
    //How to test a console log...?
    test.doesNotThrow(function () {
        recorder.record("Testing Console Recorder");
    });

    test.done();
};