var Recorder = require('../../lib/utilities/recorder');
var recorder = new Recorder();

exports['testConstructor'] = function (test) {
    test.done();
};

exports['testRecord'] = function (test) {
    test.throws(
        function () {
            recorder.record("Hello World")
        },
        "Method Not Implemented",
        "Expected Non-Implemented Method."
    );
    test.done();
};