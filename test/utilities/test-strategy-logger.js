var Recorder = require('../../lib/utilities/recorder');
var Logger = require('../../lib/utilities/strategy-logger');
var LoggerStrategy = require('../../lib/utilities/logger-strategy');
var recorder = new Recorder();

exports['testConstructor'] = function (test) {
    var l = new Logger();
    test.ok(LoggerStrategy.prototype.isPrototypeOf(l.strategy()));
    test.done();
};

exports['testDefaultRecorder'] = function (test) {
    var l = new Logger();
    test.equals(l.getRecorder(), null);
    test.done();
};

exports['testNullSetStrategy'] = function (test) {
    var l = new Logger();
    l.setStrategy(null);
    test.ok(LoggerStrategy.prototype.isPrototypeOf(l.strategy()));
    test.done();
};

exports['testEmptySetStrategy'] = function (test) {
    var l = new Logger();
    l.setStrategy();
    test.ok(LoggerStrategy.prototype.isPrototypeOf(l.strategy()));
    test.done();
};

exports['testObjectSetStrategy'] = function (test) {
    var l = new Logger();
    l.setStrategy({});
    test.ok(LoggerStrategy.prototype.isPrototypeOf(l.strategy()));
    test.done();
};

exports['testSetRecorder'] = function (test) {
    var l = new Logger();
    l.setRecorder(recorder);
    test.ok(Recorder.prototype.isPrototypeOf(l.getRecorder()));
    test.done();
};