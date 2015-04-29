var DateTimeLoggerStrategy = require("../../lib/utilities/date-time-logger-strategy");

exports['testFormat'] = function (test) {
    var s = new DateTimeLoggerStrategy();
    var date = new Date();
    var dateString = date.toISOString().slice(0, 10);
    var stamp = dateString + " " + date.toLocaleTimeString();
    test.strictEqual(s.format("Hello World."), stamp + '\t' + "Hello World.");
    test.done();
};